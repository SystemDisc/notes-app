'use client';

import { noteContext } from '@/providers/note-provider';
import { useContext, useState } from 'react';
import Button from '../atoms/button';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { notificationContext } from '@/providers/notification-provider';
import Image from 'next/image';
import { appointments, clients } from '@/utils/dummy-data';
import classNames from 'classnames';
import moment from 'moment';
import TextInput from '../atoms/text-input';

export default function NoteList() {
  const { addNotification } = useContext(notificationContext);
  const { notes, removeNote, setSelectedNote, setCreatingNote } = useContext(noteContext);

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='flex flex-col gap-4'>
      <TextInput id='searchTerm' label='Search Term' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      {notes.filter((note) => note.message.toLowerCase().includes(searchTerm.toLowerCase())).map((note, index) => {
        const appointment = appointments.find((appointment) => appointment.id === note.appointmentId);
        const client = clients.find((client) => client.id === appointment?.clientId);
        return (
          <div className='flex flex-col gap-4' key={note.id}>
            {index > 0 &&
              <hr />
            }
            <section key={note.id} className='w-full grid grid-cols-12 gap-4'>
              {client &&
                <div className='col-span-2 grid grid-cols-1'>
                  <Image className='border border-neutral-300' src={client.image} width={512} height={512} alt={client.name} />
                  <div className='text-center'>{client.name}</div>
                  <div className='text-center text-xs'>{moment(appointment?.startDate).format('MM/DD/YYYY @ h:mm:ss')}</div>
                </div>
              }
              <div
                className={classNames('p-4 overflow-hidden shadow-md shadow-neutral-900 border border-neutral-300 dark:border-white rounded', {
                  'col-span-9': client,
                  'col-span-11': !client,
                })}
                dangerouslySetInnerHTML={{ __html: note.message }}
              />
              <div className='flex flex-col gap-2'>
                <Button buttonType='red' className='!rounded w-full' onClick={async () => {
                  const result = await removeNote(note.id);
                  if ('success' in result) {
                    addNotification({
                      type: 'success',
                      message: result.success,
                    });
                  } else {
                    addNotification({
                      type: 'error',
                      message: result.error,
                    });
                  }
                }}>
                  <BsTrash />
                </Button>
                <Button buttonType='selected' className='!rounded w-full' onClick={async () => {
                  setSelectedNote(note);
                  setCreatingNote(true);
                }}>
                  <BsPencilSquare />
                </Button>
              </div>
            </section>
          </div>
        )
      })}
    </div>
  )
}
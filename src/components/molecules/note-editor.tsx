'use client';

import { useContext, useState } from 'react';
import MyEditor from './editor';
import Button from '../atoms/button';
import { noteContext } from '@/providers/note-provider';
import { handleError } from '@/utils/helpers';
import { notificationContext } from '@/providers/notification-provider';
import classNames from 'classnames';
import striptags from 'striptags';
import { decodeHTML } from 'entities';
import Image from 'next/image';
import { Appointment, Client } from '@/types';
import moment from 'moment';
import { appointments, clients } from '@/utils/dummy-data';
import Dialog from '../atoms/dialog';

export default function NoteEditor() {
  const { addNotification } = useContext(notificationContext);
  const { addNote, setCreatingNote, creatingNote } = useContext(noteContext);

  const [message, setMessage] = useState('');

  const strippedMessage = decodeHTML(striptags(message));

  const [selectedClient, setSelectedClient] = useState<Client>();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();

  const clientAppointments = appointments.filter((appointment) => appointment.clientId === selectedClient?.id);

  if (!creatingNote) {
    return null;
  }

  return (
    <Dialog isOpen className='bg-white dark:bg-neutral-700 p-4 border border-neutral-300 rounded overflow-hidden' onBackdropClick={() => {
      setCreatingNote(false);
    }}>
      <div className='grid grid-cols-1 gap-4'>
        <h2 className='text-2xl'>
          Clients:
        </h2>
        <div className='grid grid-cols-4'>
          {clients.map((client) => (
            <div key={client.id} className={classNames('grid grid-cols-1 gap-2 border border-neutral-300', {
              'outline outline-4 outline-blue-500 outline-offset-4': selectedClient?.id === client.id,
            })}>
              <Image src={client.image} width={512} height={512} alt={client.name} />
              <div className='text-sm flex flex-col justify-center items-center gap-2'>
                <span>Timothy Zorn</span>
                <Button buttonType={selectedClient?.id === client.id ? 'selected' : 'default'} className='w-fit mb-2' onClick={() => {
                  setSelectedClient(selectedClient?.id === client.id ? undefined : client);
                }}>
                  Select
                </Button>
              </div>
            </div>
          ))}
        </div>
        {clientAppointments.length > 0 &&
          <div className='grid grid-cols-1 gap-4'>
            <h2 className='text-2xl'>
              Appointments:
            </h2>
            <div className='flex gap-4'>
              {clientAppointments.map((appointment) => (
                <Button key={appointment.id} buttonType={selectedAppointment?.id === appointment.id ? 'selected' : 'default'} onClick={() => {
                  setSelectedAppointment(selectedAppointment?.id === appointment.id ? undefined : appointment);
                }}>
                  {moment(appointment.startDate).format('MM/DD/YYYY @ h:mm:ss a')}
                </Button>
              ))}
            </div>
          </div>
        }
        <MyEditor
          data={message}
          onChange={(_, editor) => {
            setMessage(editor.getData());
          }}
        />
        <div className='flex justify-between'>
          <div>
            <span className={classNames({
              'text-red-500 font-bold': strippedMessage.length < 20,
            })}>{strippedMessage.length}</span> / 300
          </div>
          <Button onClick={async () => {
            if (!selectedAppointment) {
              addNotification({
                type: 'error',
                message: 'You must select a client and appointment.',
              })
              return;
            }
            try {
              await addNote({
                message,
                appointmentId: selectedAppointment?.id,
              });
              setMessage('');
              setCreatingNote(false);
              addNotification({
                type: 'success',
                message: 'Note created successfully.',
              });
            } catch (e) {
              handleError(e, addNotification);
            }
          }}>
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
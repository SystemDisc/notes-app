'use client';

import { noteContext } from '@/providers/note-provider';
import { useContext } from 'react';
import Button from '../atoms/button';
import { BsTrash } from 'react-icons/bs';

export default function NoteList() {
  const { notes } = useContext(noteContext);

  return (
    <div className='flex flex-col gap-4'>
      {notes.map((note) => (
        <section key={note.id} className='w-full flex gap-4'>
          <div className='w-[calc(100%_-_5rem)] p-4 overflow-hidden shadow-md shadow-neutral-900 border border-neutral-300 dark:border-white rounded'>
            {note.message}
          </div>
          <Button buttonType='red' className='w-16 h-16 !rounded'>
            <BsTrash />
          </Button>
        </section>
      ))}
    </div>
  )
}
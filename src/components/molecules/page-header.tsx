'use client';

import { BsJournal } from 'react-icons/bs';
import Button from '../atoms/button';
import { useContext } from 'react';
import { noteContext } from '@/providers/note-provider';

export default function PageHeader() {
  const { setCreatingNote, setSelectedNote } = useContext(noteContext);

  return (
    <nav className='fixed z-40 bg-white dark:bg-black w-full h-16 border-b border-neutral-300 shadow-md shadow-neutral-700 dark:shadow-neutral-400'>
      <section className='h-full max-w-5xl mx-auto flex items-center justify-between'>
        <div className='h-full flex items-center gap-4 text-3xl'>
          <BsJournal />
          <span>
            Notes.app
          </span>
        </div>
        <div>
          <Button onClick={async () => {
            setSelectedNote(undefined);
            setCreatingNote(true);
          }}>
            New
          </Button>
        </div>
      </section>
    </nav>
  )
}
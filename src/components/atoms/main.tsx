'use client';

import { noteContext } from '@/providers/note-provider';
import { PropsWithChildren, useContext } from 'react';

export default function Main({ children }: PropsWithChildren) {
  const { notes, creatingNote } = useContext(noteContext);

  return (
    (notes.length > 0 || creatingNote) &&
    <main className='relative top-4 p-4 bg-white dark:bg-neutral-700 max-w-5xl mx-auto rounded overflow-hidden shadow-md shadow-neutral-700 dark:shadow-neutral-400 border border-neutral-300 dark:border-white grid grid-cols-1 gap-4'>
      {children}
    </main>
  );
}
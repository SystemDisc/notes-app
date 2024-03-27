'use client';

import { Note } from '@/db/database';
import { createNote } from '@/utils/server-actions';
import { Simplify } from 'kysely';
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

export const noteContext = createContext<{
  notes: Simplify<Note>[];
  creatingNote: boolean;
  setCreatingNote: Dispatch<SetStateAction<boolean>>;
  addNote: (message: string) => Promise<void>;
}>({
  notes: [],
  creatingNote: false,
  setCreatingNote: () => { },
  addNote: async () => { },
});

export default function NoteProvider({
  children,
  notes: initialNotes,
}: PropsWithChildren<{
  notes: Simplify<Note>[],
}>) {
  const [notes, setNotes] = useState<Simplify<Note>[]>(initialNotes);
  const [creatingNote, setCreatingNote] = useState(false);

  const addNote = async (message: string) => {
    const note = await createNote(message);
    const notesCopy = [...notes, note];
    setNotes(notesCopy);
  };

  return (
    <noteContext.Provider value={{ notes, addNote, creatingNote, setCreatingNote }}>
      {children}
    </noteContext.Provider>
  );
}

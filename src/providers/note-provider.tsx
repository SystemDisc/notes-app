'use client';

import { NewNote, Note } from '@/db/database';
import { createNote, deleteNote } from '@/utils/server-actions';
import { Simplify } from 'kysely';
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

export const noteContext = createContext({
  notes: [] as Simplify<Note>[],
  creatingNote: false,
  setCreatingNote: (() => { }) as Dispatch<SetStateAction<boolean>>,
  addNote: async (note: Simplify<NewNote>) => { },
  setNote: async (note: Simplify<Note>) => { },
  removeNote: async (id: string) => { },
});

export default function NoteProvider({
  children,
  notes: initialNotes,
}: PropsWithChildren<{
  notes: Simplify<Note>[],
}>) {
  const [notes, setNotes] = useState<Simplify<Note>[]>(initialNotes);
  const [creatingNote, setCreatingNote] = useState(false);

  const addNote = async (note: Simplify<NewNote>) => {
    const newNote = await createNote(note);
    const notesCopy = [...notes, newNote];
    setNotes(notesCopy);
  };

  const setNote = async () => { };

  const removeNote = async (id: string) => {
    await deleteNote(id);
    const notesCopy = [...notes];
    const index = notesCopy.findIndex((note) => note.id === id);

    if (index < 0) {
      return;
    }

    notesCopy.splice(index, 1);
    setNotes(notesCopy);
  };

  return (
    <noteContext.Provider value={{ notes, addNote, creatingNote, setCreatingNote, setNote, removeNote }}>
      {children}
    </noteContext.Provider>
  );
}

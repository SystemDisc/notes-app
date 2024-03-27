'use client';

import { NewNote, Note, NoteUpdate } from '@/db/database';
import { ErrorResponse, SuccessResponse } from '@/types';
import { createNote, deleteNote, updateNote } from '@/utils/server-actions';
import { Simplify } from 'kysely';
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

export const noteContext = createContext({
  notes: [] as Simplify<Note>[],
  creatingNote: false,
  setCreatingNote: (() => { }) as Dispatch<SetStateAction<boolean>>,
  addNote: async (note: Simplify<NewNote>) => { return {} as Simplify<Note> | ErrorResponse },
  setNote: async (id: string, note: Simplify<NoteUpdate>) => { return {} as SuccessResponse | ErrorResponse },
  removeNote: async (id: string) => { return {} as SuccessResponse | ErrorResponse },
  selectedNote: undefined as Simplify<Note> | undefined,
  setSelectedNote: (() => { }) as Dispatch<SetStateAction<Simplify<Note> | undefined>>,
});

export default function NoteProvider({
  children,
  notes: initialNotes,
}: PropsWithChildren<{
  notes: Simplify<Note>[],
}>) {
  const [notes, setNotes] = useState<Simplify<Note>[]>(initialNotes);
  const [creatingNote, setCreatingNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Simplify<Note>>();

  const addNote = async (note: Simplify<NewNote>) => {
    const newNote = await createNote(note);
    if (!('error' in newNote)) {
      const notesCopy = [...notes, newNote];
      setNotes(notesCopy);
    }
    return newNote;
  };

  const setNote = async (id: string, note: Simplify<NoteUpdate>) => {
    const notesCopy = [...notes];
    const existingNote = notesCopy.find((note) => note.id === id);
    if (!existingNote) {
      return {
        error: 'Note not found.',
      };
    }
    const result = await updateNote(id, note);
    Object.assign(existingNote, note);
    setNotes(notesCopy);

    return result;
  };

  const removeNote = async (id: string) => {
    const result = await deleteNote(id);
    const notesCopy = [...notes];
    const index = notesCopy.findIndex((note) => note.id === id);

    if (index < 0) {
      return {
        success: 'Note already deleted.',
      };
    }

    notesCopy.splice(index, 1);
    setNotes(notesCopy);

    return result;
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        addNote,
        creatingNote,
        setCreatingNote,
        setNote,
        removeNote,
        selectedNote,
        setSelectedNote,
      }}>
      {children}
    </noteContext.Provider>
  );
}

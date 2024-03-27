'use server';

import { db } from '@/db/database';

export const createNote = async (message: string) => {
  const notes = await db.insertInto('Note')
    .values({
      message,
    })
    .returningAll()
    .execute();

  return notes[0];
};

export const readNotes = async () => {
  const notes = await db.selectFrom('Note')
    .selectAll()
    .execute();

  return notes;
}
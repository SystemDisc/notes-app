'use server';

import { NewNote, db } from '@/db/database';
import { decodeHTML } from 'entities';
import { Simplify } from 'kysely';
import striptags from 'striptags';

export const createNote = async (note: Simplify<NewNote>) => {
  const strippedMessage = decodeHTML(striptags(note.message));;
  if (strippedMessage.length < 20) {
    throw new Error('Your message must be at least 20 characters long.');
  }
  if (strippedMessage.length > 300) {
    throw new Error('Your message must be no longer than 300 characters.');
  }

  const notes = await db.insertInto('Note')
    .values(note)
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

export const updateNote = async () => {

};

export const deleteNote = async (id: string) => {
  await db.deleteFrom('Note')
    .where('id', '=', id)
    .execute();
};
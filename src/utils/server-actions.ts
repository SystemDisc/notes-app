'use server';

import { NewNote, Note, NoteUpdate, db } from '@/db/database';
import { decodeHTML } from 'entities';
import { Simplify } from 'kysely';
import striptags from 'striptags';

export const createNote = async (note: Simplify<NewNote>) => {
  const strippedMessage = decodeHTML(striptags(note.message));;
  if (strippedMessage.length < 20) {
    return {
      error: 'Your message must be at least 20 characters long.',
    };
  }
  if (strippedMessage.length > 300) {
    return {
      error: 'Your message must be no longer than 300 characters.',
    };
  }

  let notes: Simplify<Note>[] = [];
  try {
    notes = await db.insertInto('Note')
      .values(note)
      .returningAll()
      .execute();
  } catch (e) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    } else {
      throw e;
    }
  }

  return notes[0];
};

export const readNotes = async () => {
  let notes: Simplify<Note>[] = [];
  try {
    notes = await db.selectFrom('Note')
      .selectAll()
      .execute();
  } catch (e) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    } else {
      throw e;
    }
  }

  return notes;
}

export const updateNote = async (id: string, note: Simplify<NoteUpdate>) => {
  try {
    await db.updateTable('Note')
      .set(note)
      .where('id', '=', id)
      .execute();
  } catch (e) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    } else {
      throw e;
    }
  }

  return {
    success: 'Note updated successfully.',
  }
};

export const deleteNote = async (id: string) => {
  try {
    await db.deleteFrom('Note')
      .where('id', '=', id)
      .execute();
  } catch (e) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    } else {
      throw e;
    }
  }

  return {
    success: 'Note deleted successfully.',
  }
};
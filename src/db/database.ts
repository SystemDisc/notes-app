import { createKysely } from "@vercel/postgres-kysely";
import { GeneratedAlways, Insertable, Selectable, Updateable } from 'kysely';

interface Database {
  Note: NoteTable;
}

export interface NoteTable {
  id: GeneratedAlways<string>;
  message: string;
  dateCreated?: Date;
  dateUpdated: Date | null;
}

export type Note = Selectable<NoteTable>;
export type NewNote = Insertable<NoteTable>;
export type NoteUpdate = Updateable<NoteTable>;

export const db = createKysely<Database>();

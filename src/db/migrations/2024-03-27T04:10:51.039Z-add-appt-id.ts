import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .alterTable('Note')
    .addColumn('appointmentId', 'integer')
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.alterTable('Note')
    .dropColumn('appointmentId')
    .execute();
}

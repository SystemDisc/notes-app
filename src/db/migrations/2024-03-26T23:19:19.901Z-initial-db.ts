import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('Note')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('message', 'text', (col) => col.notNull())
    .addColumn('dateCreated', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('dateUpdated', 'timestamptz')
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('Note').execute();
}

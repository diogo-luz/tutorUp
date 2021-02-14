import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('subjects', table => {
    table.increments('id').primary();
    table.string('subject').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('subjects');
}

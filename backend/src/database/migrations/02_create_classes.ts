import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('classes', table => {
    table.increments('id').primary();
    table.decimal('cost').notNullable();

    table
      .integer('owner_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .integer('subject_id')
      .notNullable()
      .references('id')
      .inTable('subjects')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('classes');
}

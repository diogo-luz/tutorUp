import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('favorites', table => {
    table.increments('id').primary();

    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .integer('teacher_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('favorites');
}

import knex from 'knex';

export async function up(knex: knex): Promise<void> {
  return knex.schema.createTable('user_tokens', table => {
    table.increments('id').primary();
    table.uuid('token').notNullable();

    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .timestamp('created_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();
  });
}

export async function down(knex: knex): Promise<void> {
  return knex.schema.dropTable('user_tokens');
}

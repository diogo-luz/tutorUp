import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('subjects').del();

  // Inserts seed entries
  await knex('subjects').insert([
    { subject: 'Artes' },
    { subject: 'Biologia' },
    { subject: 'Filosofia' },
    { subject: 'Física' },
    { subject: 'Geografia' },
    { subject: 'História' },
    { subject: 'Inglês' },
    { subject: 'Matemática' },
    { subject: 'Português' },
    { subject: 'Química' },
  ]);
}

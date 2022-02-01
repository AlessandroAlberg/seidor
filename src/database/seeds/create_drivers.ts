import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('drivers').insert([
        { name: 'jose'},
        { name: 'mario'},
        { name: 'fernando'},
        { name: 'gabriel'},
        { name: 'pedro'},
    ]);
}
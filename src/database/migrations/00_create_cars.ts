import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('cars', table => {
        table.increments('id').primary();
        table.string('board').notNullable();
        table.string('color').notNullable();
        table.string('brand').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('cars');
}
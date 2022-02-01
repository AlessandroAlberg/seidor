import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('use_cars', table => {
        table.increments('id').primary();
        table.string('driver_id').notNullable();
        table.string('car_id').notNullable();
        table.string('reason').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').nullable();

        table.foreign('driver_id').references('id').inTable('drivers');
        table.foreign('car_id').references('id').inTable('cars');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('use_cars');
}
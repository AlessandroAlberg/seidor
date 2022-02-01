import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('use_cars').insert([
        { driver_id: '1', car_id: '1', reason: 'testando carro 1', start_date: '30/01/2022'},
        { driver_id: '2', car_id: '2', reason: 'testando carro 2', start_date: '30/01/2022'},
        { driver_id: '3', car_id: '3', reason: 'testando carro 3', start_date: '30/01/2022'},
    ]);
}
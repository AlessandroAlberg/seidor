import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('cars').insert([
        { board: 'AAA-1111', color: 'azul', brand: 'ford'},
        { board: 'BBB-2222', color: 'preto', brand: 'fiat'},
        { board: 'CCC-3333', color: 'vermelho', brand: 'renault'},
        { board: 'DDD-4444', color: 'verde', brand: 'bmw'},
        { board: 'EEE-5555', color: 'amarelo', brand: 'mercedes'},
    ]);
}
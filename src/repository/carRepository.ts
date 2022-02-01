import knex from '../database/connection'

export default class CarRepository {
    constructor() {
    }

    async findAll() {
        try {
            const products = await knex('cars')
            .select('cars.*');

            return products;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async find(param: string) {
        try {
            const car = await knex('cars').where('id', param).first();
            return car;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async post(params: any) {
        try {
            const trx = await knex.transaction();
        
            const insertedIds = await trx('cars').insert(params);
            
            const carId = insertedIds[0];
            
            await trx.commit();
            
            return carId
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async update(params: any) {
        try {

            const { id, name, amount, value } = params;
            const car = await knex('cars').where('id', id).first();

            if (!car) {
                return car;
            }

            const result = await knex('cars').where({id}).update({
                name: params ? name : car.name,
                amount: amount ? amount : car.amount,
                value: value ? value : car.value
            });

            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async delete(param: string) {
        try {
            const result = await knex('cars').where({id: param}).del();

            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

}
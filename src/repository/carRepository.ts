import { CarDto, CarUpdateDto } from '../dtos/car.dto';
import knex from '../database/connection'

export default class CarRepository {
    constructor() {
    }

    async findAll() {
        try {
            const cars = await knex('cars')
            .select('cars.*');

            return cars;
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

    async post(car: CarDto) {
        try {
            const trx = await knex.transaction();
        
            const insertedIds = await trx('cars').insert(car);
            
            const carId = insertedIds[0];
            
            await trx.commit();
            
            return carId
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async update(id: string, car: CarUpdateDto) {
        try {
            const carExists = await knex('cars').where('id', id).first();

            if (!carExists) { return carExists }

            const result = await knex('cars').where({id}).update(car);

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
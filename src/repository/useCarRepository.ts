import { EndUseCarDto, UseCarDto } from '../dtos/use_car.dto';
import knex from '../database/connection';
import * as R from 'ramda';

export default class UseCarRepository {
    constructor() {
    }

    async findAll() {
        try {
            const useCars = await knex('use_cars')
            .join('cars', 'cars.id', '=' ,'use_cars.car_id')
            .join('drivers', 'drivers.id', '=' ,'use_cars.driver_id')
            .select('*');

            return useCars;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async find(param: string) {
        try {
            const useCar = await knex('use_cars').where('id', param).first();
            return useCar;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async findCarUsed(id: string) {
        try {
            const carUsed = await knex('use_cars').where('car_id', id).andWhere('end_date', null).first();
            return carUsed;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async findDriverIsUsing(id: string) {
        try {
            const driverIsUsing = await knex('use_cars').where('driver_id', id).andWhere('end_date', null).first();
            return driverIsUsing;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async post(useCar: UseCarDto) {
        try {
            const trx = await knex.transaction();
        
            const insertedIds = await trx('use_cars').insert(useCar);
            
            const useCarId = insertedIds[0];
            
            await trx.commit();
            
            return useCarId
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async update(id: string, endDate: EndUseCarDto) {
        try {

            const useCar = await knex('use_cars').where('id', id).first();

            if (R.isNil(useCar)) { return useCar }
            
            const result = await knex('use_cars').where({id}).update(endDate);

            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

}
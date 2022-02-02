import { DriverDto } from '../dtos/driver';
import knex from '../database/connection';
import * as R from 'ramda';

export default class DriverRepository {
    constructor() {
    }

    async findAll() {
        try {
            const drivers = await knex('drivers')
            .select('drivers.*');

            return drivers;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async find(param: string) {
        try {
            const driver = await knex('drivers').where('id', param).first();
            return driver;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async findFiltered(filter: string) {
        try {
            const drivers = await knex('drivers')
                .where('name', filter)

            return drivers;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async post(driver: DriverDto) {
        try {
            const trx = await knex.transaction();
        
            const insertedIds = await trx('drivers').insert(driver);
            
            const driverId = insertedIds[0];
            
            await trx.commit();
            
            return driverId
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async update(id: string, driver: DriverDto) {
        try {

            const driverExists = await knex('drivers').where('id', id).first();

            if (R.isNil(driverExists)) { return driverExists }

            const result = await knex('drivers').where({id}).update(driver);

            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async delete(param: string) {
        try {
            const result = await knex('drivers').where({id: param}).del();
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

}
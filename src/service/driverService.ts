import { DriverDto } from '../dtos/driver';
import DriverRepository from '../repository/driverRepository';
import UseCarRepository from '../repository/useCarRepository';
import { transformAndValidate } from 'class-transformer-validator';
import * as R from 'ramda';

export default class DriverService {
    private _repository: DriverRepository;
    private _repositoryUseCar: UseCarRepository;
    constructor() {
        this._repository = new DriverRepository();
        this._repositoryUseCar = new UseCarRepository();
    }
    
    async index(req: any, res: any) {
        try {
            const filter = req.query?.name;
            const result = filter
                ? await this._repository.findFiltered(filter) 
                : await this._repository.findAll();
            return res.status(200).send(result);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async show(req: any, res: any) {
        try {
            const param = req.params.id;
            
            const result = await this._repository.find(param);
            if (R.isNil(result)) {
                return res.status(400).json({ message: 'Driver not found.' });
            }

            return res.status(200).json({ result });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async create(req: any, res: any) {
        try{
            const driver = await transformAndValidate(DriverDto, req.body)
            const driverId = await this._repository.post(driver as DriverDto);
            
            return res.status(201).json({
                id: driverId,
                ...driver
            });
        } catch (error: any) {
            res.status(400).json(error)
        }
    }

    async update(req: any, res: any) {
        try{
            const id = req.params.id;
            const driver = await transformAndValidate(DriverDto, req.body)
            const result = await this._repository.update(id, driver as DriverDto);

            if (R.isNil(result)) {
                return res.status(400).json({ message: 'Driver not found.' });
            }
            
            return res.status(200).json({ response: result, message: 'Updated driver.'});
        } catch (error: any) {
            res.status(400).json(error);
        }
    }

    async delete(req: any, res: any) {
        try{
            const param = req.params.id;

            const driverIsUsing = await this._repositoryUseCar.findCarUsed(param);

            if (!R.isNil(driverIsUsing)) {
                return res.status(400).json({ message: 'Driver is using a vehicle.' });
            }

            const result = await this._repository.delete(param);
            
            return res.status(200).json({response: result, message: 'Delete driver.'});;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
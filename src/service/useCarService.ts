import UseCarRepository from '../repository/useCarRepository';
import { transformAndValidate } from 'class-transformer-validator';
import { EndUseCarDto, UseCarDto } from '../dtos/use_car.dto';
import * as R from 'ramda';

export default class UseCarService {
    private _repository: UseCarRepository;
    constructor() {
        this._repository = new UseCarRepository();
    }
    
    async index(req: any, res: any) {
        try {
            const result = await this._repository.findAll();
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
                return res.status(400).json({ message: 'Vehicle usage record not found.' });
            }

            return res.status(200).json({ result });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async create(req: any, res: any) {
        try{
            const useCar = await transformAndValidate(UseCarDto, req.body)

            const carUsed = await this._repository.findCarUsed((useCar as UseCarDto).car_id);
            if (!R.isNil(carUsed)) { return res.status(400).json({ message: 'Vehicle is already being used.' }) }

            const driverIsUsing = await this._repository.findDriverIsUsing((useCar as UseCarDto).driver_id);
            if (!R.isNil(driverIsUsing)) { return res.status(400).json({ message: 'Driver is using a vehicle.' }) }

            const useCarId = await this._repository.post(useCar as UseCarDto);
            
            return res.status(201).json({
                id: useCarId,
                ...useCar
            });
        } catch (error: any) {
            res.status(400).json(error);
        }
    }

    async update(req: any, res: any) {
        try{
            const id = req.params.id;
            const endDate = await transformAndValidate(EndUseCarDto, req.body)
            const result = await this._repository.update(id, endDate as EndUseCarDto);

            if (R.isNil(result)) {
                return res.status(400).json({ message: 'Vehicle usage record not found.' });
            }
            
            return res.status(200).json({ response: result, message: 'Vehicle use is terminated.'});
        } catch (error: any) {
            res.status(400).json(error);
        }
    }
}
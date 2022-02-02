import { CarDto, CarUpdateDto, FilterCarDto } from '../dtos/car.dto';
import CarRepository from '../repository/carRepository';
import UseCarRepository from '../repository/useCarRepository';
import { transformAndValidate } from 'class-transformer-validator';
import * as R from 'ramda';

export default class CarService {
    private _repository: CarRepository;
    private _repositoryUseCar: UseCarRepository;
    constructor() {
        this._repository = new CarRepository();
        this._repositoryUseCar = new UseCarRepository();
    }
    
    async index(req: any, res: any) {
        try {
            const filter = req.query as FilterCarDto;
            const result = filter.brand || filter.color 
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
                return res.status(400).json({ message: 'Car not found.' });
            }

            return res.status(200).json({ result });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async create(req: any, res: any) {
        try{
            const car = await transformAndValidate(CarDto, req.body)
            const carId = await this._repository.post(car as CarDto);
            
            return res.status(201).json({
                id: carId,
                ...car
            });
        } catch (error: any) {
            res.status(400).json(error);
        }
    }

    async update(req: any, res: any) {
        try{
            const id = req.params.id;
            const car = await transformAndValidate(CarUpdateDto, req.body);
            const result = await this._repository.update(id, car as CarUpdateDto);

            if (R.isNil(result)) {
                return res.status(400).json({ message: 'Car not found.' });
            }
            
            return res.status(200).json({ response: result, message: 'Updated car.'});
        } catch (error: any) {
            res.status(400).json(error);
        }
    }

    async delete(req: any, res: any) {
        try{
            const param = req.params.id;
            const useCarExits = await this._repositoryUseCar.findCarUsed(param);

            if (!R.isNil(useCarExits)) {
                return res.status(400).json({ message: 'Vehicle is already being used.' });
            }

            const result = await this._repository.delete(param);

            return res.status(200).json({response: result, message: 'Delete car.'});;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
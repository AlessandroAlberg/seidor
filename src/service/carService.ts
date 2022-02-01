import { CarDto, CarUpdateDto } from '../dtos/car.dto';
import CarRepository from '../repository/carRepository';
import { transformAndValidate } from 'class-transformer-validator';

export default class CarService {
    private _repository: CarRepository;
    constructor() {
        this._repository = new CarRepository();
    }
    
    async index(req: any, res: any) {
        try {
            let result = await  this._repository.findAll();
            return res.status(200).send(result);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async show(req: any, res: any) {
        try {
            const param = req.params.id;
            
            const result = await this._repository.find(param);
            if (!result) {
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
            res.status(400).json(error)
        }
    }

    async update(req: any, res: any) {
        try{
            const id = req.params.id;
            const car = await transformAndValidate(CarUpdateDto, req.body)
            const result = await this._repository.update(id, car as CarUpdateDto);

            if (!result) {
                return res.status(400).json({ message: 'Car not found.' });
            }
            
            return res.status(200).json({ response: result, message: 'Updated car.'});
        } catch (error: any) {
            res.status(400).json(error)
        }
    }

    async delete(req: any, res: any) {
        try{
            const param = req.params.id;
            const result = await this._repository.delete(param);
            
            return res.status(200).json({response: result, message: 'Delete car.'});;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
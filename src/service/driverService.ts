import { DriverDto } from '../dtos/driver';
import DriverRepository from '../repository/driverRepository';
import { transformAndValidate } from 'class-transformer-validator';

export default class DriverService {
    private _repository: DriverRepository;
    constructor() {
        this._repository = new DriverRepository();
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

            if (!result) {
                return res.status(400).json({ message: 'Driver not found.' });
            }
            
            return res.status(200).json({ response: result, message: 'Updated driver.'});
        } catch (error: any) {
            res.status(400).json(error)
        }
    }

    async delete(req: any, res: any) {
        try{
            const param = req.params.id;
            const result = await this._repository.delete(param);
            
            return res.status(200).json({response: result, message: 'Delete driver.'});;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
import { Request, Response } from 'express';
import CarService from '../service/carService';

export default class CarController {

    async index (req: Request, res: Response) {
        const service = new CarService();
        const result = await service.index();
        return res.status(200).send(result);
    }

    async show (req: Request, res: Response) {
        const service = new CarService();
        return service.show(req, res);
    }
    
    async create (req: Request, res: Response) {
        const service = new CarService();
        return service.create(req, res);
    }
    
    async update (req: Request, res: Response) {
        const service = new CarService();
        return service.update(req, res);
    }
    
    async delete (req: Request, res: Response) {
        const service = new CarService();
        return service.delete(req, res);
    }

}
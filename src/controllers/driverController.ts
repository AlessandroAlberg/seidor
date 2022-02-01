import { Request, Response } from 'express';
import DriverRepository from '../service/driverService';

export default class DriverController {

    async index (req: Request, res: Response) {
        const service = new DriverRepository();
        return await service.index(req, res);
    }

    async show (req: Request, res: Response) {
        const service = new DriverRepository();
        return service.show(req, res);
    }
    
    async create (req: Request, res: Response) {
        const service = new DriverRepository();
        return service.create(req, res);
    }
    
    async update (req: Request, res: Response) {
        const service = new DriverRepository();
        return service.update(req, res);
    }
    
    async delete (req: Request, res: Response) {
        const service = new DriverRepository();
        return service.delete(req, res);
    }

}
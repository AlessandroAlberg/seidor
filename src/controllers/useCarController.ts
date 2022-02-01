import { Request, Response } from 'express';
import UseCarService from '../service/useCarService';

export default class UseCarController {

    async index (req: Request, res: Response) {
        const service = new UseCarService();
        return await service.index(req, res);
    }

    async show (req: Request, res: Response) {
        const service = new UseCarService();
        return service.show(req, res);
    }
    
    async create (req: Request, res: Response) {
        const service = new UseCarService();
        return service.create(req, res);
    }
    
    async update (req: Request, res: Response) {
        const service = new UseCarService();
        return service.update(req, res);
    }

}
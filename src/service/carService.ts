import CarRepository from '../repository/carRepository'

export default class CarService {
    private _repository: CarRepository;
    constructor() {
        this._repository = new CarRepository();
    }
    
    async index() {
        try {
            let result = await  this._repository.findAll();
            return result;
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
            const params = req.body
            const carId = await this._repository.post(params);
            
            return res.status(201).json({
                id: carId,
                ...params
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async update(req: any, res: any) {
        try{
            const params = req.body
            const result = await this._repository.update(params);

            if (!result) {
                return res.status(400).json({ message: 'Car not found.' });
            }
            
            return res.status(200).json({ response: result, message: 'Updated product.'});
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async delete(req: any, res: any) {
        try{
            const param = req.params.id;
            const result = await this._repository.delete(param);
            
            return res.status(200).json({response: result, message: 'Delete product.'});;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
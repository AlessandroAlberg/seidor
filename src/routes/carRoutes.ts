import express from 'express';
import CarController from '../controllers/carController';

const routes = express.Router();
const carController = new CarController();

routes.route('/').get(carController.index);
routes.get('/:id', carController.show);
routes.post('/', carController.create);
routes.put('/:id', carController.update);
routes.delete('/:id', carController.delete);

module.exports = routes;
import express from 'express';
import CarController from '../controllers/carController';

const routes = express.Router();
const carController = new CarController();

routes.route('/').get(carController.index);
routes.get('/products/:id', carController.show);
routes.post('/products', carController.create);
routes.put('/products/:id', carController.update);
routes.delete('/products/:id', carController.delete);

module.exports = routes;
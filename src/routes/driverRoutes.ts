import express from 'express';
import DriverController from '../controllers/driverController';

const routes = express.Router();
const driverController = new DriverController();

routes.route('/').get(driverController.index);
routes.get('/:id', driverController.show);
routes.post('/', driverController.create);
routes.put('/:id', driverController.update);
routes.delete('/:id', driverController.delete);

module.exports = routes;
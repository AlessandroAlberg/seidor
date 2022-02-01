import express from 'express';
import UseCarController from '../controllers/useCarController';

const routes = express.Router();
const useCarController = new UseCarController();

routes.route('/').get(useCarController.index);
routes.get('/:id', useCarController.show);
routes.post('/', useCarController.create);
routes.put('/end-use/:id', useCarController.update);

module.exports = routes;
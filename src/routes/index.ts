const express = require('express');
const car = require('./carRoutes');
const driver = require('./driverRoutes');
const useCar = require('./useCarRoutes');
const routes = express.Router();

routes.use('/car', car);
routes.use('/driver', driver);
routes.use('/use-car', useCar);

export default routes;
const express = require('express');
const car = require('./carRoutes');
const routes = express.Router();

routes.use('/car', car);

export default routes;
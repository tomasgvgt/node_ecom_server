const express = require('express');
const productsRouter = require('./products');
const usersRouter = require('./users');
const customersRouter = require('./customers');
const categoriesRouter = require('./categories');
const ordersRouter = require('./orders');


function routes(app){
  const routerApi = express.Router();
  const routerV1 = express.Router();
  app.use('/api', routerApi);
  routerApi.use('/v1', routerV1)
  routerV1.use('/products', productsRouter);
  routerV1.use('/users', usersRouter);
  routerV1.use('/customers', customersRouter);
  routerV1.use('/categories', categoriesRouter);
  routerV1.use('/orders', ordersRouter);
}

module.exports = routes;

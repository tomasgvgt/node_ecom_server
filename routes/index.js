const express = require('express');
const productsRouter = require('./products');
const usersRouter = require('./users');


function routes(app){
  const routerApi = express.Router();
  const routerV1 = express.Router();
  app.use('/api', routerApi);
  routerApi.use('/v1', routerV1)
  routerV1.use('/products', productsRouter);
  routerV1.use('/users', usersRouter);
  //routerV1.use('/categories', categoriesRouter);
}

module.exports = routes;

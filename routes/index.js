const express = require('express');
const productsRouter = require('./products');
const usersRouter = require('./users');
const router = express.Router();


function routes(app){
  const routerV1 = express.Router();
  router.use('/api/v1/', routerV1);
  routerV1.use('/products', productsRouter);
  routerV1.use('/users', usersRouter);
  //routerV1.use('/categories', categoriesRouter);
  app.use(router);
}

module.exports = routes;

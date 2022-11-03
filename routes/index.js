const express = require('express');
const productsRouter = require('./products');
const router = express.Router();


function routes(app){
  const routerV1 = express.Router();

  router.use('/api/v1/', routerV1);
  routerV1.use('/products', productsRouter);
  //routerV1.use('/categories', categoriesRouter);
  //routerV1.use('/users', usersRouter);


  app.use(router);
}

module.exports = routes;

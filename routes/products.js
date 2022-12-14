const express = require('express');
const router = express.Router();
const products = require('../services/products')
const {successResponse} = require('../middlewears/response');
const { createProductSchema, updateProductSchema, getProductSchema, paginationSchema } = require('../schemas/productsSchema');
const dataValidator = require('../middlewears/dataValidation');
const passport = require('../authentication/');

router.get('/',
  async (req, res, next)=>{
  try{
      let prods = await products.getDataBase(req.query);
      res.body = prods;
      successResponse(req, res, {
        status: 200,
        message: "Products"
      })
    }catch(err){
    err.message = "Couldn't load products, please try again later";
    res.status(404);
    next(err);
  }
})

router.get('/:id',
  dataValidator(getProductSchema, 'params'),
  async (req, res, next)=>{
    try{
      let id = req.params.id.toString();
      let prod = await products.findOne(id);
      res.body = prod;
      successResponse(req, res, {
        status: 200,
        message: `Product`
      });
    }catch(err){
      next(err);
    }
})

router.post('/',
  passport.authenticate('jwt', {session: false}),
  dataValidator(createProductSchema, 'body'),
  async (req, res, next)=>{
    let prod = await products.createOne(req.body);
    res.body = prod;
    successResponse(req, res, {
      status: 201,
      message: "Product successfully created"
    });
})

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  dataValidator(getProductSchema, 'params'),
 async (req, res, next)=>{
  try{
    let id = req.params.id;
    await products.deleteOne(id);
    res.body = id;
    successResponse(req, res,{
      status: 201,
      message: `product ${id} succesfully deleted`
      });
  }catch(err){
    next(err);
  }
})

router.put('/:id',
  passport.authenticate('jwt', {session: false}),
  dataValidator(getProductSchema, 'params'),
  dataValidator(createProductSchema, 'body'),
  async (req, res, next)=>{
    try{
      let id = req.params.id;
      const product = await products.updateOne(id, req.body);
      res.body = id;
      successResponse(req, res,{
        status: 201,
        message: `Product ${id} successfully updated`
    });
    }catch(err){
      next(err);
    }
})

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  dataValidator(getProductSchema, 'params'),
  dataValidator(updateProductSchema, 'body'),
  async (req, res, next)=>{
  try{
    let id = req.params.id;
    const product = await products.updateOne(id, req.body);
    res.body = id;
    successResponse(req, res,{
      status: 201,
      message: `Product ${id} successfully updated`
  });
  }catch(err){
    next(err);
  }
})




module.exports = router;

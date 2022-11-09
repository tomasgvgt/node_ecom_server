const express = require('express');
const router = express.Router();
const products = require('../services/products')
const {successResponse} = require('../response');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productsSchema');
const dataValidator = require('../middlewears/dataValidation');

router.get('/', async (req, res, next)=>{
  try{
      let prods = await products.getDataBase();
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

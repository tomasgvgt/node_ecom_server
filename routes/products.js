const express = require('express');
const router = express.Router();
const products = require('../services/products')
const {successResponse} = require('../response');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productsSchema');
const dataValidator = require('../middlewears/dataValidation');

router.get('/', (req, res, next)=>{
  try{
    let {limit} = req.query;
    let size = limit ? limit : 100;
    let prods = [];
    if(size > 0 && size != 100){
      for(i = 0; i < size; i++){
        prods.push(products.data[i]);
      }
    }else{
      prods = products.data;
    }
    res.body = prods;
    console.log("Successful Api request");
    successResponse(req, res, {
      status: 200,
      message: "Products"
    })
  }catch(err){
    console.log(err);
    err.message = "Couldn't load products, please try again later";
    res.status(404);
    next(err);
  }
})

router.get('/:id',
  dataValidator(getProductSchema, 'params'),
  (req, res, next)=>{
    try{
      let id = req.params.id.toString();
      let prod = products.findOne(id);
      res.body = prod;
      successResponse(req, res, {
        status: 200,
        message: `Product`
      });
    }catch(err){
      console.error(err.message);
      err.message = "Product doesn't exist, send a correct Id";
      res.status(404)
      next(err);
    }
})

router.post('/',
  dataValidator(createProductSchema, 'body'),
  (req, res, next)=>{
    let prod = products.createOne(req.body);
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
    let deleted = await products.deleteOne(id);
    res.body = deleted;
    successResponse(req, res,{
      status: 201,
      message: `product succesfully deleted`
      });
  }catch(err){
    console.error(err.message);
    err.message = "Product doesnt exist, send correct Id"
    res.status = 404;
    next(err);
  }
})

router.put('/:id',
  dataValidator(getProductSchema, 'params'),
  dataValidator(createProductSchema, 'body'),
  (req, res, next)=>{
    try{
      let id = req.params.id;
      const product = products.updateOne(id, req.body);
      res.body = product;
      successResponse(req, res,{
        status: 201,
        message: `Product successfully changed`
    });
    }catch(err){
      console.error(err.message);
      res.status(404);
      next(err);
    }
})

router.patch('/:id',
  dataValidator(getProductSchema, 'params'),
  (req, res, next)=>{
  try{
    let id = req.params.id;
    const product = products.updateOne(id, req.body);
    res.body = product;
    successResponse(req, res,{
      status: 201,
      message: `Product successfully changed`
  });
  }catch(err){
    console.error(err.message);
    err.message = "Product doesnt exist, send correct Id";
    res.status(404);
    next(err);
  }
})




module.exports = router;

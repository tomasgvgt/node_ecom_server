const express = require('express');
const customers = require('../services/customers');
const {successResponse} = require('../middlewears/response');
const dataValidator = require('../middlewears/dataValidation');
const { getCustomerSchema, updateCustomerSchema, createCustomerSchema } = require('../schemas/customersSchema');
const router = express.Router();



router.get('/', async (req, res, next)=>{
  try{
    const data = await customers.getDataBase();
    res.body = data;
    successResponse(req, res, {
      status: 200,
      message: 'Customers'
    })
  }catch(err){
    err.message = "Couldnt load data";
    res.status = 500;
    next(err);
  }
})

router.get('/:id',
  dataValidator(getCustomerSchema, 'params'),
  async (req, res, next)=>{
  try{
    const user = await customers.findOne(req.params.id);
    res.body= user;
    successResponse(req, res, {
      status: 200,
      message: 'Customer'
    })
  }catch(err){
      res.status(404);
      next(err);
  }
})

router.post('/',
  dataValidator(createCustomerSchema, 'body'),
  async (req, res, next)=>{
  try{
    const user = await customers.createOne(req.body);
    res.body = user;
    successResponse(req, res, {
      status: 201,
      message: 'Customer successfully created'
    })
  }catch(err){
    console.log(err);
    next(err);
  }
})

router.put('/:id',
  dataValidator(getCustomerSchema, 'params'),
  dataValidator(createCustomerSchema, 'body'),
  async (req, res, next)=>{
  try{
    const user = await customers.updateOne(req.params.id, req.body);
    res.body = req.params.id;
    successResponse(req, res, {
      status: 201,
      message: `Customer ${req.params.id} successfully updated`
    });
  }catch(err){
    res.status(404);
    next(err);
  }
})

router.patch('/:id',
  dataValidator(getCustomerSchema, 'params'),
  dataValidator(updateCustomerSchema, 'body'),
  async (req, res, next)=>{
    try{
      const user = await customers.updateOne(req.params.id, req.body);
      res.body = req.params.id;
      successResponse(req, res, {
        status: 201,
        message: `Customer ${req.params.id} successfully updated`
      });
    }catch(err){
      res.status(404);
      next(err);
    }
})

router.delete('/:id',
  dataValidator(getCustomerSchema, 'params'),
  async (req, res, next)=>{
  try{
    const user = await customers.deleteOne(req.params.id);
    res.body = req.params.id;
    console.log(res.body);
    successResponse(req, res, {
      status: 201,
      message: `Customer ${req.params.id} successfully deleted`
    });
  }catch(err){
    res.status(404);
    next(err);
  }
})


module.exports = router;

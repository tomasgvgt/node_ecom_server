const express = require('express');
const router = express.Router();
const orders = require('../services/orders')
const {successResponse} = require('../response');
const { createOrderSchema, addItemSchema, getOrderSchema } = require('../schemas/ordersSchema');
const dataValidator = require('../middlewears/dataValidation');

router.get('/', async (req, res, next)=>{
  try{
      let data = await orders.getDataBase();
      res.body = data;
      successResponse(req, res, {
        status: 200,
        message: "Orders"
      })
    }catch(err){
    err.message = "Couldn't load orders, please try again later";
    res.status(404);
    next(err);
  }
})

router.get('/:id',
  dataValidator(getOrderSchema, 'params'),
  async (req, res, next)=>{
    try{
      let id = req.params.id.toString();
      let order = await orders.findOne(id);
      res.body = order;
      successResponse(req, res, {
        status: 200,
        message: `Order`
      });
    }catch(err){
      next(err);
    }
})

router.post('/',
  dataValidator(createOrderSchema, 'body'),
  async (req, res, next)=>{
    let order = await orders.createOne(req.body);
    res.body = order;
    successResponse(req, res, {
      status: 201,
      message: "Order successfully created"
    });
})

router.post('/add-item',
  dataValidator(addItemSchema, 'body'),
  async (req, res, next)=>{
    let item = await orders.addItem(req.body);
    res.body = item;
    successResponse(req, res, {
      status: 201,
      message: "Order successfully created"
    });
})

router.delete('/:id',
  dataValidator(getOrderSchema, 'params'),
 async (req, res, next)=>{
  try{
    let id = req.params.id;
    await orders.deleteOne(id);
    res.body = id;
    successResponse(req, res,{
      status: 201,
      message: `order ${id} succesfully deleted`
      });
  }catch(err){
    next(err);
  }
})





module.exports = router;

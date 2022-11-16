const Joi = require('joi');

const id = Joi.string();
const CustomerId = Joi.number();
const OrderId = Joi.number();
const ProductId = Joi.number();
const amount = Joi.number().min(1);

const createOrderSchema = Joi.object({
  CustomerId : CustomerId.required()
});


const getOrderSchema = Joi.object({
  id: id.required(),
});

const addItemSchema = Joi.object({
  OrderId: OrderId.required(),
  ProductId: ProductId.required(),
  amount: amount.required()
});


module.exports = { createOrderSchema, getOrderSchema, addItemSchema}

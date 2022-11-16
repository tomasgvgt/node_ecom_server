const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const CategoryId = Joi.number()

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  CategoryId : CategoryId.required()
});

const updateProductSchema = Joi.object({
  name,
  description,
  price,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }

const Joi = require('joi');


const id = Joi.string();
const name = Joi.string();
const phone = Joi.number();
const email = Joi.string();
const password = Joi.string();
const UserId = Joi.number();

const getCustomerSchema = Joi.object({
  id: id.required()
});

const updateCustomerSchema = Joi.object({
  name,
  phone,
  UserId
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  phone: phone.required(),
  User: Joi.object({
    email: email.required(),
    password: password.required()
  }).required()
});


module.exports = {
  getCustomerSchema,
  updateCustomerSchema,
  createCustomerSchema
}

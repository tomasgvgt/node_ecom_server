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
  id,
  name,
  phone,
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  phone: phone.required(),
  UserId,
  User: Joi.object({
    email: email.required(),
    password: password.required()
  })
});


module.exports = {
  getCustomerSchema,
  updateCustomerSchema,
  createCustomerSchema
}

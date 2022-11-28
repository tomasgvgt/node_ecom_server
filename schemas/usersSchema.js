const Joi = require('joi');


const id = Joi.string();
const email = Joi.string();
const password = Joi.string();
const role = Joi.string();

const getUserSchema = Joi.object({
  id: id.required()
});

const updateUserSchema = Joi.object({
  id,
  email
});

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role
});


module.exports = {
  getUserSchema,
  updateUserSchema,
  createUserSchema
}

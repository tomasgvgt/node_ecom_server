const Joi = require('joi');


const id = Joi.string();
const name = Joi.string();
const email = Joi.string();

const getUserSchema = Joi.object({
  id: id.required()
});

const updateUserSchema = Joi.object({
  id,
  name,
  email
});

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required()
});


module.exports = {
  getUserSchema,
  updateUserSchema,
  createUserSchema
}

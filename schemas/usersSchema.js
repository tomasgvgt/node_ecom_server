const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum();
const age = Joi.number().min(18);

const getUserSchema = Joi.object({
  id: id.required()
});

const updateUserSchema = Joi.object({
  id,
  name,
  age
});

const createUserSchema = Joi.object({
  name: name.required(),
  age: age.required()
});


module.exports = {
  getUserSchema,
  updateUserSchema,
  createUserSchema
}

const express = require('express');
const users = require('../services/users');
const {successResponse} = require('../response');
const dataValidator = require('../middlewears/dataValidation');
const { getUserSchema, updateUserSchema, createUserSchema } = require('../schemas/usersSchema');
const router = express.Router();



router.get('/', async (req, res, next)=>{
  try{
    const data = await users.getDataBase();
    res.body = data;
    successResponse(req, res, {
      status: 200,
      message: 'Users'
    })
  }catch(err){
    err.message = "Couldnt load data";
    res.status = 500;
    next(err);
  }
})

router.get('/:id',
  dataValidator(getUserSchema, 'params'),
  async (req, res, next)=>{
  try{
    const user = await users.findOne(req.params.id);
    res.body= user;
    successResponse(req, res, {
      status: 200,
      message: 'User'
    })
  }catch(err){
      res.status(404);
      next(err);
  }
})

router.post('/',
  dataValidator(createUserSchema, 'body'),
  async (req, res, next)=>{
  try{
    const user = await users.createOne(req.body);
    res.body = user;
    successResponse(req, res, {
      status: 201,
      message: 'User successfully created'
    })
  }catch(err){
    res.status(500);
    err.message('Couldnt create User');
    next(err);
  }
})

router.put('/:id',
  dataValidator(getUserSchema, 'params'),
  dataValidator(createUserSchema, 'body'),
  async (req, res, next)=>{
  try{
    const user = await users.updateOne(req.params.id, req.body);
    res.body = req.params.id;
    successResponse(req, res, {
      status: 201,
      message: `User ${req.params.id} successfully updated`
    });
  }catch(err){
    res.status(404);
    next(err);
  }
})

router.patch('/:id',
  dataValidator(getUserSchema, 'params'),
  dataValidator(updateUserSchema, 'body'),
  async (req, res, next)=>{
    try{
      const user = await users.updateOne(req.params.id, req.body);
      res.body = req.params.id;
      successResponse(req, res, {
        status: 201,
        message: `User ${req.params.id} successfully updated`
      });
    }catch(err){
      res.status(404);
      next(err);
    }
})

router.delete('/:id',
  dataValidator(getUserSchema, 'params'),
  async (req, res, next)=>{
  try{
    const user = await users.deleteOne(req.params.id);
    res.body = req.params.id;
    console.log(res.body);
    successResponse(req, res, {
      status: 201,
      message: `User ${req.params.id} successfully deleted`
    });
  }catch(err){
    res.status(404);
    next(err);
  }
})


module.exports = router;

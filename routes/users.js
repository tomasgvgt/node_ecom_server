const express = require('express');
const users = require('../services/users');
const {successResponse} = require('../middlewears/response');
const dataValidator = require('../middlewears/dataValidation');
const { getUserSchema, updateUserSchema, createUserSchema } = require('../schemas/usersSchema');
const router = express.Router();
const passport = require('passport');



router.get('/', async (req, res, next)=>{
  //passport.autenticate
  //Admin authorization
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
  //passport.autenticate
  //Admin authorization, customer with Id authorization
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
    console.log(err);
    next(err);
  }
})

router.put('/:id',
  passport.authenticate('jwt', {session: false}),
  //Admin authorization and user with id.
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
  passport.authenticate('jwt', {session: false}),
  //Admin authorization and user with Id
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
  passport.authenticate('jwt', {session: false}),
  //Admin authorization and user with Id
  dataValidator(getUserSchema, 'params'),
  async (req, res, next)=>{
  try{
    await users.deleteOne(req.params.id);
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

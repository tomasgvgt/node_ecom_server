const express = require('express');
const categories = require('../services/categories');
const {successResponse} = require('../middlewears/response');
const dataValidator = require('../middlewears/dataValidation');
const { getCategorySchema, updateCategorySchema, createCategorySchema } = require('../schemas/categoriesSchema');
const router = express.Router();



router.get('/', async (req, res, next)=>{
  try{
    const data = await categories.getDataBase();
    res.body = data;
    successResponse(req, res, {
      status: 200,
      message: 'Categories'
    })
  }catch(err){
    err.message = "Couldnt load data";
    res.status = 500;
    next(err);
  }
})

router.get('/:id',
  dataValidator(getCategorySchema, 'params'),
  async (req, res, next)=>{
  try{
    const category = await categories.findOne(req.params.id);
    res.body= category;
    successResponse(req, res, {
      status: 200,
      message: 'Category'
    })
  }catch(err){
      res.status(404);
      next(err);
  }
})

router.post('/',
  dataValidator(createCategorySchema, 'body'),
  async (req, res, next)=>{
  try{
    const category = await categories.createOne(req.body);
    res.body = category;
    successResponse(req, res, {
      status: 201,
      message: 'Category successfully created'
    })
  }catch(err){
    console.log(err);
    next(err);
  }
})

router.put('/:id',
  dataValidator(getCategorySchema, 'params'),
  dataValidator(createCategorySchema, 'body'),
  async (req, res, next)=>{
  try{
    const category = await categories.updateOne(req.params.id, req.body);
    res.body = req.params.id;
    successResponse(req, res, {
      status: 201,
      message: `Category ${req.params.id} successfully updated`
    });
  }catch(err){
    res.status(404);
    next(err);
  }
})

router.patch('/:id',
  dataValidator(getCategorySchema, 'params'),
  dataValidator(updateCategorySchema, 'body'),
  async (req, res, next)=>{
    try{
      const category = await categories.updateOne(req.params.id, req.body);
      res.body = req.params.id;
      successResponse(req, res, {
        status: 201,
        message: `Category ${req.params.id} successfully updated`
      });
    }catch(err){
      res.status(404);
      next(err);
    }
})

router.delete('/:id',
  dataValidator(getCategorySchema, 'params'),
  async (req, res, next)=>{
  try{
    const category = await categories.deleteOne(req.params.id);
    res.body = req.params.id;
    console.log(res.body);
    successResponse(req, res, {
      status: 201,
      message: `Category ${req.params.id} successfully deleted`
    });
  }catch(err){
    res.status(404);
    next(err);
  }
})


module.exports = router;

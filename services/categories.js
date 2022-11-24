const Boom = require('@hapi/boom');
const db = require('../db/models');
class Categories{
  constructor(){}

  async getDataBase(){
    this.data = await db.Category.findAll({
      include: 'Product'
    });
    return this.data;
    }

  async createOne(data){
    const category = await db.Category.create(data)
    return category;
  }

  async findOne(categoryId){
    let category = await db.Category.findAll({
      where: {id: categoryId},
      include: 'Product'
    });
    if(category.length === 0){
      throw Boom.notFound("Incorrect Id");
    }
    return category;
  }

  async deleteOne(categoryId){
    const deleted = await db.Category.destroy({
      where: {id: categoryId}
    })
    if(deleted === 0){
      throw Boom.notFound("Id not found");
    }
    return category;
  }

  async updateOne(categoryId, changes){
    let category = await db.Category.update(changes, {
      where: {id: categoryId}
    });
    category = category[0];
    if(category === 0){
      throw Boom.notFound('Id not found');
    }
    return category;
  }
}

//Create an instance to produce a singleton. So when imported it will always be thesame instance of the class Products.
const categories = new Categories();

module.exports = categories;

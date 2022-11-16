const {faker} = require('@faker-js/faker');
const Boom = require('@hapi/boom');
const db = require('../models')
class Products{
  constructor(){}

  async getDataBase(params){
    console.log(params)
    const options = {
      include: 'Category'
    }
    if(params.offset && params.limit){
      options.limit = params.limit,
      options.offset = params.offset
    }
    console.log(options)
    this.data = await db.Product.findAll(options);
    return this.data;
    }

  async createOne(data){
    const product = await db.Product.create(data, {
      include: 'Category',
    })
    return product;
  }

  async findOne(productId){
    let product = await db.Product.findAll({
      where: {id: productId},
      include: 'Category'
    });
    if(product.length === 0){
      throw Boom.notFound("Incorrect Id");
    }
    return product;
  }

  async deleteOne(productId){
    const deleted = await sequelize.Product.destroy({
      where: {id: productId}
    })
    if(deleted === 0){
      throw Boom.notFound("Id not found");
    }
    return deleted;
  }

  async updateOne(productId, changes){
    let product = await sequelize.Product.update(changes, {
      where: {id: productId}
    });
    product = product[0];
    if(product === 0){
      throw Boom.notFound('Id not found');
    }
    return product;
  }
}

//Create an instance to produce a singleton. So when imported it will always be thesame instance of the class Products.
const products = new Products();

module.exports = products;

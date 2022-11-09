const {faker} = require('@faker-js/faker');
const Boom = require('@hapi/boom');
const Product = require('../models/sequelize/products')
class Products{
  constructor(){}

  async getDataBase(){
    this.data = await Product.findAll();
    return this.data;
    }

  async createOne(data){
    const product = await Product.create(data)
    return product;
  }

  async findOne(productId){
    let product = await Product.findAll({
      where: {id: productId}
    });
    if(product.length === 0){
      throw Boom.notFound("Incorrect Id");
    }
    return product;
  }

  async deleteOne(productId){
    const deleted = await Product.destroy({
      where: {id: productId}
    })
    if(deleted === 0){
      throw Boom.notFound("Id not found");
    }
    return deleted;
  }

  async updateOne(productId, changes){
    let product = await Product.update(changes, {
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

const Boom = require('@hapi/boom');
const db = require('../models')
class Orders{
  constructor(){}
  async getDataBase(){
    this.data = await db.Order.findAll({ include: { all: true, nested: true }});
    return this.data;
    }

  async createOne(data){
    const order = await db.Order.create(data, {
      include: 'Customer',
    })
    return order;
  }

  async addItem(data){
    const item = await db.OrderProduct.create(data);
    return item;
  }

  async findOne(orderId){
    let order = await db.Order.findAll({
      where: {id: orderId},
      include: { all: true, nested: true }
    });
    if(order.length === 0){
      throw Boom.notFound("Incorrect Id");
    }
    return order;
  }

  async deleteOne(orderId){
    const deleted = await sequelize.Order.destroy({
      where: {id: orderId}
    })
    if(deleted === 0){
      throw Boom.notFound("Id not found");
    }
    return deleted;
  }
}

//Create an instance to produce a singleton. So when imported it will always be thesame instance of the class Products.
const orders = new Orders();

module.exports = orders;

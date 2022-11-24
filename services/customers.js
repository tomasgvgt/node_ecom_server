const db = require('../db/models');
const Boom = require('@hapi/boom');

class Customer{
  constructor(){};
  async getDataBase(){
    const data = await db.Customer.findAll({
      include: 'User'
    });
    console.log(data);
    this.data = data;
    return this.data
  }
  async findOne(customerId){
    let customer = await db.Customer.findAll({
      where: {id: customerId},
      include: 'User'
    })
    if(customer.length === 0){
      throw Boom.notFound('Id not found');
    }
    return customer;
  }
  async deleteOne(customerId){
    const deleted = await db.Customer.destroy({
      where: {id: customerId}
    })
    if(deleted === 0){
      throw Boom.notFound('Id not found');
    }
    return deleted;
  }
  async createOne(data){
    const customer = await db.Customer.create(data, {
      include: "User"
    });
    return customer;
  }
  async updateOne(customerId, data){
    let updated = await db.Customer.update(data, {
      where: {id: customerId}
    })
    updated = updated[0];
    if(updated === 0){
      throw Boom.notFound('Id not found')
    }
    return updated;
  }
}

const customers = new Customer();

module.exports = customers;

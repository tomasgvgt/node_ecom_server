const Boom = require('@hapi/boom');
const db = require('../db/models');
const {encryptPassword} = require('../authentication/password');
const { sequelize } = require('../db/models');
class Users{
  constructor(){
  }
  async getDataBase(){
    this.data = await db.User.findAll({
      include: 'Customer',
    });
    return this.data;
  }

  async createOne(userInfo){
    let hash = await encryptPassword(userInfo.password);
    userInfo.password = hash;
    let user = await db.User.create(userInfo);
    delete user.dataValues.password;
    return user;
  }

  async findOne(userId){
    let user = await db.User.findAll({
      where: {id: userId},
      include: 'Customer'
    });
    if(user.length === 0){
      throw Boom.notFound('Id not found');
    }
    return user;
  }

  async findByEmail(passedEmail){
    let user = await db.User.findOne({
      where: {email: passedEmail},
      include: 'Customer'
    });
    return user;
  }

  async deleteOne(userId){
    let customer = await db.Customer.findOne({
      where: {UserId: userId}
    });
    let deletedCustomer = await db.Customer.destroy({
      where: {id: customer.id}
    })
    let deletedUser = await db.User.destroy({
      where: {id: userId},
    });
    if(deletedUser === 0 || deletedCustomer === 0){
      throw Boom.notFound('Id not found');
    }
    return;
  }

  async updateOne(userId, changes){
    let user = await db.User.update(changes, {
      where: {id: userId}
    })
    user = user[0];
    if(user === 0){
      throw Boom.notFound('Id not found')
    }
    return user;
  }
}

const users = new Users();


module.exports = users;


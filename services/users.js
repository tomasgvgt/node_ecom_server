const Boom = require('@hapi/boom');
const User = require('../models/sequelize/users');
class Users{
  constructor(){
  }
  async getDataBase(){
    this.data = await User.findAll();
    return this.data;
  }

  async createOne(userInfo){
    let user = await User.create(userInfo);
    return user;
  }

  async findOne(userId){
    let user = await User.findAll({
      where: {id: userId}
    });
    if(user.length === 0){
      throw Boom.notFound('Id not found');
    }
    return user;
  }

  async deleteOne(userId){
    let deleted = await User.destroy({
      where: {id: userId}
    })
    if(deleted === 0){
      throw Boom.notFound('Id not found');
    }
    return deleted;
  }

  async updateOne(userId, changes){
    let user = await User.update(changes, {
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


const {faker} = require('@faker-js/faker');

class Users{
  constructor(){
    this.data = this.create();
  }
  create(){
    const db = [];
    for(let i = 0; i < 10; i++){
      db.push({
        id: faker.datatype.uuid().toString(),
        name: faker.name.firstName(),
        age: faker.datatype.number(100)
      })
    }
    return db;
  }
  async getDataBase(){
    return this.data;
  }

  async createOne(userInfo){
    const user = {
      id: faker.datatype.uuid().toString(),
      ...userInfo
    }
    this.data.push(user);
    return user;
  }

  async findOne(id){
    const idx = this.data.findIndex((user)=>{
      return user.id === id;
    })
    if(idx === -1){
      throw new Error(`No user with ID: ${id}`);
    }
    return this.data[idx];
  }

  async deleteOne(id){
    const idx = this.data.findIndex((user)=>{
      return user.id === id;
    })
    const user = this.data[idx];
    if(idx === -1){
      throw new Error(`No user with ID: ${id}`);
    }
    this.data.splice(idx, 1);

    return user;
  }

  async updateOne(id, changes){
    const idx = this.data.findIndex((user)=>{
      return user.id === id;
    })
    if(idx === -1){
      throw new Error(`No user with ID: ${id}`);
    }
    this.data[idx] = {
      ... this.data[idx],
      ... changes
    }
    return this.data[idx];
  }
}

const users = new Users();

module.exports = users;


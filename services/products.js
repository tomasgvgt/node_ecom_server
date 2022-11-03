const {faker} = require('@faker-js/faker');
const boom = require("@hapi/boom")

class Products{
  constructor(){
    this.data = [];
    this.create();
  }
  create(){
    for(let i = 0; i < 5; i++){
      let product = {
        id: faker.datatype.uuid().toString(),
        name: faker.commerce.productName(),
        price: faker.commerce.price().toString(),
        img: faker.image.imageUrl(),
      }
      this.data.push(product);
    }
    return this.data;
  }

  createOne(data){
    let product = {};
    product.id = faker.datatype.uuid().toString();
    product.name = data.name;
    product.price = data.price;
    product.img = data.img;
    this.data.push(product);
    return product;
  }

  findOne(id){
    let product = this.data.find((prod) =>{
      return prod.id === id;
    });
    if(product){
      return product;
    }
    throw new Error("Incorrect Id");
  }

  async deleteOne(id){
    for(let i = 0; i < this.data.length; i++){
      if(this.data[i].id === id){
        const product = this.data[i];
        this.data.splice(i, 1);
        return product;
      }
    }
  }

  updateOne(id, changes){
    const index = this.data.findIndex(prod => prod.id === id);
    if(index === -1){
      throw new Error("Incorrect Id")
    }
    this.data[index] = {
      ...this.data[index],
      ...changes
    }
    return this.data[index];
  }

}

//Create an instance to produce a singleton. So when imported it will always be thesame instance of the class Products.
const products = new Products();

module.exports = products;

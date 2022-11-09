const sequelize = require('../../lib/sequelize');
const {DataTypes} = require('sequelize');


const Product = sequelize.define('products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
})


//Product.sync({force: true});


module.exports = Product;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Customer);
      this.belongsToMany(models.Product, { through: models.OrderProduct });
    }
  }
  Order.init({
    CustomerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Customer',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    total: {
      type: DataTypes.VIRTUAL,
      get(){
        if(this.Products.length > 0){
          return this.Products.reduce((accumulator, product)=>{
            return accumulator + (product.price * product.OrderProduct.amount)
          }, 0)
        }
        return 0
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};

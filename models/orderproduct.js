'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderProduct.init({
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    OrderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Order',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    ProductId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });
  return OrderProduct;
};

const {DataTypes} = require('sequelize');
const sequelize = require('../../lib/sequelize');

const User = sequelize.define('users',{
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.SMALLINT,
    allowNull: false
  }
})

// User.sync({force: true});

module.exports = User;

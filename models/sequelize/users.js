const {DataTypes} = require('sequelize');
const sequelize = require('../../lib/sequelize');

const User = sequelize.define('users',{
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

//User.sync({force: true});

module.exports = User;

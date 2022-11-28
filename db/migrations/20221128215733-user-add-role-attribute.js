'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'customer'
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'role');
  }
};

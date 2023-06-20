'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    if (queryInterface.sequelize.getDialect() === 'postgres'){
      await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    }
  },

  async down (queryInterface, Sequelize) {
    //
  }
};

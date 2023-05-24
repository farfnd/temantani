'use strict';
const { hashPassword } = require('../../src/utils/password');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        name: 'Andri',
        email: 'andri@test.com',
        phoneNumber: '1234567890',
      },
      {
        name: 'Budi',
        email: 'budi@test.com',
        phoneNumber: '081234567890',
      },
      {
        name: 'Candra',
        email: 'candra@test.com',
        phoneNumber: '081234567890',
      }
    ];
    
    await queryInterface.bulkInsert('Farmers', users);  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Farmers', null, {});
  }
};

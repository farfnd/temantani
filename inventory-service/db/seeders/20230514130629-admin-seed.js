'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const admins = [
      { name: 'Admin' },
      { name: 'Bambang' },
      { name: 'Eko' }
    ];
    
    // Insert user roles
    await queryInterface.bulkInsert('Admins', admins);    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};

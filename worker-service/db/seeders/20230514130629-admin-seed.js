'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const admins = [
      { name: 'Admin', email: 'admin@admin.com' },
      { name: 'Bambang', email: 'bambang@admin.com' },
      { name: 'Eko', email: 'eko@admin.com' }
    ];
    
    // Insert user roles
    await queryInterface.bulkInsert('Admins', admins);    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};

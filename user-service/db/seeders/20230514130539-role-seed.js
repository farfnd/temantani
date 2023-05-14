'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const roles = [
      { name: 'admin.farmer' },
      { name: 'admin.store' },
      { name: 'farmer' },
      { name: 'customer' }
    ];

    await queryInterface.bulkInsert('Roles', roles);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};

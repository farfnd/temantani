'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = [
      {
        name: 'Jagung',
        description: 'Jagung manis',
        price: 10000,
        stock: 10,
        status: 'available',
        preOrderEstimatedStock: null,
        preOrderEstimatedDate: null
      },
      {
        name: 'Beras',
        description: 'Beras putih',
        price: 10000,
        stock: 20,
        status: 'available',
        preOrderEstimatedStock: null,
        preOrderEstimatedDate: null
      },
      {
        name: 'Gandum',
        description: 'Gandum putih',
        price: 11000,
        stock: 5,
        status: 'available',
        preOrderEstimatedStock: null,
        preOrderEstimatedDate: null
      }
    ];
    
    // Insert user roles
    await queryInterface.bulkInsert('Products', products);    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};

'use strict';
const { v4 } = require('uuid');
const AdminRole = require('../../src/domain/enums/AdminRole');
const UserRole = require('../../src/domain/enums/UserRole');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [
      { name: AdminRole.SUPER },
      { name: AdminRole.BUYER },
      { name: AdminRole.WORKER },
      { name: UserRole.BUYER },
      { name: UserRole.WORKER }
    ];

    await queryInterface.bulkInsert('Roles', roles);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};

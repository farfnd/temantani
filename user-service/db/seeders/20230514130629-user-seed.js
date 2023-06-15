'use strict';
const { hashPassword } = require('../../src/support/helpers');
const { v4 } = require('uuid');
const AdminRole = require('../../src/domain/enums/AdminRole');
const UserRole = require('../../src/domain/enums/UserRole');
const { Role } = require('../../src/domain/models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        name: 'SuperAdmin',
        email: 'SuperAdmin@admin.com',
        password: hashPassword('password'),
        phoneNumber: '1234567890',
        roles: [AdminRole.SUPER]
      },
      {
        name: 'Admin_Buyer',
        email: 'Admin_Buyer@admin.com',
        password: hashPassword('password'),
        phoneNumber: '1234567890',
        roles: [AdminRole.BUYER]
      },
      {
        name: 'Admin_Worker',
        email: 'Admin_Worker@admin.com',
        password: hashPassword('password'),
        phoneNumber: '1234567890',
        roles: [AdminRole.WORKER]
      },
      {
        name: 'Budi',
        email: 'budi@test.com',
        password: hashPassword('password'),
        phoneNumber: '081234567890',
        roles: [UserRole.WORKER]
      },
      {
        name: 'Candra',
        email: 'candra@test.com',
        password: hashPassword('password'),
        phoneNumber: '081234567890',
        roles: [UserRole.BUYER]
      }
    ];
    
    // Insert users without roles
    const usersWithoutRoles = users.map(({ roles, ...user }) => user);
    const insertedUsers = await queryInterface.bulkInsert('Users', usersWithoutRoles, {
      returning: ['id']
    });
    
    // Get user IDs and role IDs
    const userRoles = [];
    for (let i = 0; i < users.length; i++) {
      const { roles } = users[i];
      const userId = insertedUsers[i].id;
      const roleIds = [];
      for (let j = 0; j < roles.length; j++) {
        const foundRole = await Role.findOne({ where: { name: roles[j] } });
        if (foundRole) {
          roleIds.push(foundRole.id);
        }
      }
      for (let j = 0; j < roleIds.length; j++) {
        userRoles.push({ userId, roleId: roleIds[j] });
      }
    }
    
    // Insert user roles
    await queryInterface.bulkInsert('UserRoles', userRoles);    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserRoles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};

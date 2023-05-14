'use strict';
const { hashPassword } = require('../../src/utils/password');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: hashPassword('password'),
        phone: '1234567890',
        roles: ['admin.farmer', 'admin.store']
      },
      {
        name: 'Budi',
        email: 'budi@test.com',
        password: hashPassword('password'),
        phone: '081234567890',
        roles: ['farmer']
      },
      {
        name: 'Candra',
        email: 'candra@test.com',
        password: hashPassword('password'),
        phone: '081234567890',
        roles: ['customer']
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

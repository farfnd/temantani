import insertSeedData from './abstracts/seeder';
import { hashPassword, getRoleIdByName } from "../src/utils";
import Role from '../src/domain/models/Role';
import User from '../src/domain/models/User';
import UserRole from '../src/domain/models/UserRole';

export async function seed (knex) {
  // Retrieve the role IDs
  const roles = await Role.findAll();

  // Define the users
  const users = [
    {
      name: 'admin',
      email: 'admin@admin.com',
      password: hashPassword('password'),
      phone: '081234567890',
      roles: ['admin.farmer', 'admin.store'],
    },
    {
      name: 'john',
      email: 'john@admin.com',
      password: hashPassword('password'),
      phone: '081234567890',
      roles: ['farmer'],
    },
    {
      name: 'budi',
      email: 'budi@admin.com',
      password: hashPassword('password'),
      phone: '081234567890',
      roles: ['customer'],
    },
  ];

  // Prepare the users without roles
  const usersWithoutRoles = users.map(({ roles, ...user }) => user);

  // Seed the users without roles
  await insertSeedData(knex, 'users', usersWithoutRoles);

  // Retrieve the seeded users
  const seededUsers = await User.findAll();

  const seededUserRole = [];
  // Assign roles to the users
  await Promise.all(
    seededUsers.map(async (user) => {
      const userRoles = users.find(({ name }) => name === user.name).roles;
      await Promise.all(
        userRoles.map(async (roleName) => {
          const roleId = await getRoleIdByName(knex, roleName);
          seededUserRole.push({ user_id: user.id, role_id: roleId });
        })
      );
    })
  );
  
  // Seed the user roles
  await insertSeedData(knex, 'user_roles', seededUserRole);
}

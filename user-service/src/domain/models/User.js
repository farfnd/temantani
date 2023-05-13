import model from './abstracts/Model.js';
import knex from '../../infrastructure/knex.js';
import UserRole from './UserRole.js';

const User = model({
    tableName: "users",
});

User.getUserRoles = async (userId) => {
    const userRoles = await UserRole.findByUserId(userId);
    const roleIds = userRoles.map(userRole => userRole.role_id);
    const roles = await knex('roles').whereIn('id', roleIds);
    return roles;
};

export default User;

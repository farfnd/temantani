import model from './abstracts/Model.js';

const UserRole = model({
    tableName: 'user_roles',
});

UserRole.create = (userId, roleId) => {
    return UserRole.query().insert({ user_id: userId, role_id: roleId });
};

UserRole.findByUserId = (userId) => {
    return UserRole.query().where('user_id', userId);
};

UserRole.findByRoleId = (roleId) => {
    return UserRole.query().where('role_id', roleId);
};

UserRole.deleteByUserId = (userId) => {
    return UserRole.query().where('user_id', userId).del();
};

UserRole.deleteByRoleId = (roleId) => {
    return UserRole.query().where('role_id', roleId).del();
};

export default UserRole;

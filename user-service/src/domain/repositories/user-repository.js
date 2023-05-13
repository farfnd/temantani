import User from '../models/User.js';
import UserRole from '../models/UserRole.js';

export default () => {
    const selectProps = [ 'id', 'email', 'name', 'phone' ];
    const repository = {
        getAllUsers: () => {
            return User.findAll().select(selectProps);
        },
        getUserById: async (id) => {
            const user = await User.find({ id }).select(selectProps).first();
            const roles = await User.getUserRoles(id);
            user.roles = roles.map(role => role.name);
            return user;
        },
        createUser: (body) => {
            return User.create(body);
        },
        updateUser: (id, body) => {
            return User.update(id, body);
        },
        deleteUser: async (id) => {
            await UserRole.deleteByUserId(id);
            return User.destroy(id);
        }
    };

    return repository;
};

import User from '../models/User.js';
import UserRole from '../models/UserRole.js';

export default () => {
    const selectProps = [ 'id', 'email', 'name', 'phone' ];
    const repository = {
        getAllUsers: () => {
            return User.findAll().select(selectProps);
        },
        getUserById: (id) => {
            return User.getWithUserRoles(id);
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

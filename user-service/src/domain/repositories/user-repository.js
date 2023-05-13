import User from '../models/User.js';

export default () => {
    const selectProps = [ 'id', 'email', 'name', 'phone' ];
    const repository = {
        getAllUsers: () => {
            return User.findAll().select(selectProps);
        },
        getUserById: async (id) => {
            const user = await User.find({ id }).select(selectProps).first();
            const roles = await User.getUserRoles(id);
            console.log(roles);
            user.roles = roles.map(role => role.name);
            return user;
        },
        createUser: (body) => {
            return User.create(body);
        },
        updateUser: (id, body) => {
            return User.update(id, body);
        },
        deleteUser: (id) => {
            return User.destroy(id);
        }
    };

    return repository;
};

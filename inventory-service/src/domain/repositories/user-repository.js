import User from '../models/User.js';

export default () => {
    const selectProps = [ 'id', 'email', 'name', 'phone' ];
    const repository = {
        getAllUsers: () => {
            return User.findAll().select(selectProps);
        },
        getUserById: (id) => {
            return User.find({ id }).select(selectProps).first();
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

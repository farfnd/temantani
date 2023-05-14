const { User, Role, UserRoles } = require('../models/index.js');

module.exports = () => {
    const selectProps = ['id', 'email', 'name', 'phone'];
    const repository = {
        getAllUsers: () => {
            return User.findAll({
                attributes: selectProps,
            });
        },
        getUserById: (id) => {
            return User.findOne({
                where: { id },
                include: [{ model: UserRoles }],
            });
        },
        createUser: (body) => {
            return User.create(body);
        },
        updateUser: (id, body) => {
            return User.update(body, {
                where: { id },
            });
        },
        deleteUser: async (id) => {
            await UserRoles.destroy({
                where: { userId: id },
            });
            return User.destroy({
                where: { id },
            });
        },
    };

    return repository;
};

const { User, Role, UserRoles } = require('../models');

module.exports = () => {
    const selectProps = ['id', 'email', 'name', 'phone'];
    const repository = {
        getAllUsers: () => {
            return User.findAll({
                attributes: { exclude: ['password'] }
            });
        },
        getUserById: async (id) => {
            const user = await User.findByPk(id, {
                include: 'roles',
                attributes: { exclude: ['password'] },
            });
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            return user;
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

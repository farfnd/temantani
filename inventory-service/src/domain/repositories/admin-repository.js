const { Admin } = require('../models');

module.exports = () => {
    const repository = {
        getAllAdmins: () => {
            return Admin.findAll();
        },
        getAdminById: (id) => {
            return Admin.findOne({ where: { id } });
        },
        createAdmin: (body) => {
            return Admin.create(body);
        },
        updateAdmin: (id, body) => {
            return Admin.update(body, { where: { id } });
        },
        deleteAdmin: async (id) => {
            return Admin.destroy({ where: { id } });
        }
    };

    return repository;
};

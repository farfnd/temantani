const { Admin } = require('../models');
const errors = require('../../support/errors');

class AdminService {
    static async verifyAdminExists(adminId) {
        const admin = await Admin.findByPk(adminId);
        if (!admin) {
            console.log("Admin does not exist");
            throw errors.BadRequest("Admin does not exist");
        }

        return true;
    }
}

module.exports = AdminService;

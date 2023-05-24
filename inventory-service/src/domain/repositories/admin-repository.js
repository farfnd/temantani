const { Admin } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class AdminRepository extends BaseRepository {
    constructor() {
        super(Admin);
    }
}

module.exports = new AdminRepository();

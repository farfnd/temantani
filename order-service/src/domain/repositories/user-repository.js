const { User } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }
}

module.exports = UserRepository;

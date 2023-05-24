const { Farmer } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class FarmerRepository extends BaseRepository {
    constructor() {
        super(Farmer);
    }
}

module.exports = new FarmerRepository();

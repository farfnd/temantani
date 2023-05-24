const { Land } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class LandRepository extends BaseRepository {
    constructor() {
        super(Land);
    }
}

module.exports = new LandRepository();

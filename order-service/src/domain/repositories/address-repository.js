const { Address } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class AddressRepository extends BaseRepository {
    constructor() {
        super(Address);
    }
}

module.exports = new AddressRepository();

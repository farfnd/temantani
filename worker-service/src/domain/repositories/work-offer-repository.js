const { WorkOffer } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class WorkOfferRepository extends BaseRepository {
    constructor() {
        super(WorkOffer);
    }
}

module.exports = new WorkOfferRepository();

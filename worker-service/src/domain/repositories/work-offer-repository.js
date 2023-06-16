const BaseRepository = require('./abstracts/base-repository');
const { WorkOffer } = require('../models');

class WorkOfferRepository extends BaseRepository {
    constructor() {
        super(WorkOffer);
    }
}

module.exports = WorkOfferRepository;

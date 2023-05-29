const { Invoice } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class InvoiceRepository extends BaseRepository {
    constructor() {
        super(Invoice);
    }
}

module.exports = InvoiceRepository;

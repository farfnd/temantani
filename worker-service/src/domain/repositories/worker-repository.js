const { Worker } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class WorkerRepository extends BaseRepository {
    constructor() {
        super(Worker);
    }
}

module.exports = WorkerRepository;

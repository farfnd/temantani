const { WorkReport } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class WorkReportRepository extends BaseRepository {
    constructor() {
        super(WorkReport);
    }
}

module.exports = WorkReportRepository;

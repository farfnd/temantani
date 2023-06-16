const BaseRepository = require('./abstracts/base-repository');
const { WorkReport } = require('../models');

class WorkReportRepository extends BaseRepository {
    constructor() {
        super(WorkReport);
    }
}

module.exports = WorkReportRepository;

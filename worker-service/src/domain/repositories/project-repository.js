const { Project } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class ProjectRepository extends BaseRepository {
    constructor() {
        super(Project);
    }
}

module.exports = new ProjectRepository();

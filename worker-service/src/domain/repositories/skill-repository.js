const { Skill } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class SkillRepository extends BaseRepository {
    constructor() {
        super(Skill);
    }
}

module.exports = SkillRepository;

const AbstractUseCase = require('./abstracts/base-use-cases');

class SkillUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }
}

module.exports = (repository) => {
    const useCases = new SkillUseCase(repository);
    return useCases;
};

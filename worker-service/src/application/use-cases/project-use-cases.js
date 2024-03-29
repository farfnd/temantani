const AbstractUseCase = require('./abstracts/base-use-cases');

class ProjectUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }
}

module.exports = (repository) => {
    const useCases = new ProjectUseCase(repository);
    return useCases;
};

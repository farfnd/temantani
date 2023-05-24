const AbstractUseCase = require('./abstracts/base-use-cases');

class AdminUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }
}

module.exports = (repository) => {
    const useCases = new AdminUseCase(repository);
    return useCases;
};

const AbstractUseCase = require('./abstracts/base-use-cases');

class WorkerUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }
}

module.exports = (repository) => {
    const useCases = new WorkerUseCase(repository);
    return useCases;
};

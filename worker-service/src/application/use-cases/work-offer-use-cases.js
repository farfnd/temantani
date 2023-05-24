const AbstractUseCase = require('./abstracts/base-use-cases');

class WorkOfferUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }
}

module.exports = (repository) => {
    const useCases = new WorkOfferUseCase(repository);
    return useCases;
};

const AbstractUseCase = require('./abstracts/base-use-cases');

class LandUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }
}

module.exports = (repository) => {
    const useCases = new LandUseCase(repository);
    return useCases;
};

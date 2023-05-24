const AbstractUseCase = require('./abstracts/base-use-cases');

class FarmerUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }
}

module.exports = (repository) => {
    const useCases = new FarmerUseCase(repository);
    return useCases;
};

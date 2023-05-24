const AbstractUseCase = require('./abstracts/base-use-cases');

class ProductUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }
}

module.exports = (repository) => {
    const useCases = new ProductUseCase(repository);
    return useCases;
};

const AbstractUseCase = require('./abstracts/base-use-cases');

class InvoiceUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }
}

module.exports = (repository) => {
    const useCases = new InvoiceUseCase(repository);
    return useCases;
};

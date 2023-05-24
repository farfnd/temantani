const AbstractUseCase = require('./abstracts/base-use-cases');

class WorkReportUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }
}

module.exports = (repository) => {
    const useCases = new WorkReportUseCase(repository);
    return useCases;
};

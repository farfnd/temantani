const AbstractUseCase = require('./abstracts/base-use-cases');
const AcceptableStatus = require('../../domain/enums/AcceptableStatus');

class WorkReportUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }

    create(data, options = {}) {
        data.status = AcceptableStatus.PENDING;
        return super.create(data, options);
    }
}

module.exports = (repository) => {
    const useCases = new WorkReportUseCase(repository);
    return useCases;
};

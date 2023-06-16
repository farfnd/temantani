const AbstractUseCase = require('./abstracts/base-use-cases');
const AcceptableStatus = require('../../domain/enums/AcceptableStatus');
const ProjectStatus = require('../../domain/enums/ProjectStatus');
const ProjectService = require('../../domain/services/project-service');
const WorkerService = require('../../domain/services/worker-service');
const WorkReportService = require('../../domain/services/work-report-service');

class WorkReportUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }

    async create(data, options = {}) {
        const { projectId, workerId, week } = data;

        if (! (
            await ProjectService.verifyProjectStatus(projectId, ProjectStatus.ONGOING)
            && await WorkerService.verifyWorker(workerId)
            && await ProjectService.isWorkerAssignedToProject(projectId, workerId)
            && await WorkReportService.isWorkReportExistsForWeek(projectId, workerId, week)
        )) {
            return;
        }
        
        data.status = AcceptableStatus.PENDING;
        return super.create(data, options);
    }

    async update(id, data, options = {}) {
        if (! (await WorkReportService.isTransitionAllowed(id, data.status))) {
            return;
        }
        return super.update(id, data, options);
    }

    async delete(id, options = {}) {
        if (! (await WorkReportService.isWorkReportStatusPending(id))) {
            return;
        }
        return super.delete(id, options);
    }
}

module.exports = (repository) => {
    const useCases = new WorkReportUseCase(repository);
    return useCases;
};

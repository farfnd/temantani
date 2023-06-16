const AbstractUseCase = require('./abstracts/base-use-cases');
const ProjectStatus = require('../../domain/enums/ProjectStatus');
const ProjectService = require('../../domain/services/project-service');
const WorkOfferService = require('../../domain/services/work-offer-service');
const WorkerService = require('../../domain/services/worker-service');
const AdminService = require('../../domain/services/admin-service');

class WorkOfferUseCase extends AbstractUseCase {
    constructor(repository) {
        super(repository);
    }

    async create(data, options = {}) {
        const { projectId, workerId, adminId } = data;

        if (! (
            await ProjectService.verifyProjectStatus(projectId, ProjectStatus.HIRING)
            && await ProjectService.isProjectNotFull(projectId, workerId)
            && await WorkOfferService.verifyWorkOfferDoesNotExist(projectId, workerId)
            && await WorkerService.verifyWorkerExists(workerId)
            && await AdminService.verifyAdminExists(adminId)
        )) {
            return;
        }
        return super.create(data, options);
    }

    async update(id, data, options = {}) {
        if (! (
            await WorkOfferService.verifyWorkOfferExists(id)
            && await WorkOfferService.isTransitionAllowed(id, data.status)
        )) {
            return;
        }
        return super.update(id, data, options);
    }

    async delete(id, options = {}) {
        if (! (
            await WorkOfferService.verifyWorkOfferExists(id)
            && await WorkOfferService.isWorkOfferStatusPending(id)
        )) {
            return;
        }
        return super.delete(id, options);
    }
}

module.exports = (repository) => {
    const useCases = new WorkOfferUseCase(repository);
    return useCases;
};

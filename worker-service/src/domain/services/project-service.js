const { WorkOffer, Project } = require('../models');
const AcceptableStatus = require('../enums/AcceptableStatus');
const errors = require('../../support/errors');

class ProjectService {
    static async verifyProjectStatus(projectId, status) {
        const project = await Project.findByPk(projectId);
        if (!project) {
            console.log("Project does not exist");
            throw errors.BadRequest("Project does not exist");
        }
        if (project.status !== status) {
            console.log(`Project is not ${status.toLowerCase()}`);
            throw errors.BadRequest(`Project is not ${status.toLowerCase()}`);
        }

        return true;
    }

    static async isProjectNotFull(projectId) {
        const project = await Project.findByPk(projectId);
        const existingProjectWorkOffer = await WorkOffer.findAll({ where: { projectId } })
        if(existingProjectWorkOffer && existingProjectWorkOffer.length >= project.workerNeeds) {
            throw errors.BadRequest("Project is already full");
        }

        return true;
    }

    static async isWorkerAssignedToProject(projectId, workerId) {
        const workOffer = await WorkOffer.findOne({
            where: {
                projectId,
                workerId,
                status: AcceptableStatus.ACCEPTED,
                workContractAccepted: true,
            }
        });

        if (!workOffer) {
            throw errors.BadRequest("Worker is not assigned to the project");
        }

        return true;
    }
}

module.exports = ProjectService;

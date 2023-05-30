const BaseRepository = require('./abstracts/base-repository');
const errors = require('../../support/errors');
const { WorkOffer, Project, Admin, Worker } = require('../models');
const ProjectStatus = require('../enums/ProjectStatus');

class WorkOfferRepository extends BaseRepository {
    constructor() {
        super(WorkOffer);
    }

    async create(data, options = {}) {
        const { projectId, workerId, adminId } = data;

        // Check if the project exists
        const project = await Project.findByPk(projectId);
        if (!project) {
            console.log("Project does not exist");
            throw errors.BadRequest("Project does not exist");
        }
        if (project.status !== ProjectStatus.HIRING) {
            console.log("Project is not hiring");
            throw errors.BadRequest("Project is not hiring");
        }

        // Check if the worker exists
        const worker = await Worker.findByPk(workerId);
        if (!worker) {
            console.log("Worker does not exist");
            throw errors.BadRequest("Worker does not exist");
        }

        // Check if the admin exists
        const admin = await Admin.findByPk(adminId);
        if (!admin) {
            console.log("Admin does not exist");
            throw errors.BadRequest("Admin does not exist");
        }

        // Check if the worker is already assigned to the project
        const existingWorkOffer = await WorkOffer.findOne({ where: { projectId, workerId } });
        if (existingWorkOffer) {
            throw errors.BadRequest("Worker is already assigned to the project");
        }
        
        return super.create(data, options);
    }
}

module.exports = WorkOfferRepository;

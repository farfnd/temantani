const errors = require('../../support/errors');
const { WorkOffer, Project, Admin, Worker } = require('../models');
const BaseRepository = require('./abstracts/base-repository');

class WorkOfferRepository extends BaseRepository {
    constructor() {
        super(WorkOffer);
    }

    async create(data, options = {}) {
        const { projectId, workerId, adminId } = data;

        // Check if the project exists
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw errors.BadRequest("Project does not exist");
        }

        // Check if the worker exists
        const worker = await Worker.findByPk(workerId);
        if (!worker) {
            throw errors.BadRequest("Worker does not exist");
        }

        // Check if the admin exists
        const admin = await Admin.findByPk(adminId);
        if (!admin) {
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

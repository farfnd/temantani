const BaseRepository = require('./abstracts/base-repository');
const errors = require('../../support/errors');
const { WorkReport, Project, Worker, WorkOffer } = require('../models');
const ProjectStatus = require('../enums/ProjectStatus');
const AcceptableStatus = require('../enums/AcceptableStatus');

class WorkReportRepository extends BaseRepository {
    constructor() {
        super(WorkReport);
    }
    
    async create(data, options = {}) {
        const { projectId, workerId } = data;

        // Check if the project exists
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw errors.BadRequest("Project does not exist");
        }
        if (project.status !== ProjectStatus.ONGOING) {
            throw errors.BadRequest("Project is not ongoing");
        }

        // Check if the worker exists
        const worker = await Worker.findByPk(workerId);
        if (!worker) {
            throw errors.BadRequest("Worker does not exist");
        }
        
        // Check if the worker is assigned to the project
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

        // Check if work report already exists for the week
        const workReport = await WorkReport.findOne({
            where: {
                projectId,
                workerId,
                week: data.week,
            }
        });
        if (workReport) {
            throw errors.BadRequest("Work report already exists for the week");
        }
        
        try {
            return await super.create(data, options);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    async update(id, data, options = {}) {
        const workReport = await WorkReport.findByPk(id);
        if (data.status && AcceptableStatus.canTransition(workReport.status, data.status) === false) {
            throw errors.BadRequest("Work report status transition is not allowed");
        }
        
        return super.update(id, data, options);
    }

    async delete(id, options = {}) {
        const workReport = await WorkReport.findByPk(id);
        if (workReport.status !== AcceptableStatus.PENDING) {
            throw errors.BadRequest("Work report is already verified");
        }

        return super.delete(id, options);
    }
}

module.exports = WorkReportRepository;

const BaseRepository = require('./abstracts/base-repository');
const { WorkReport } = require('../models');
const ProjectStatus = require('../enums/ProjectStatus');

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
        
        return super.create(data, options);
    }
}

module.exports = WorkReportRepository;

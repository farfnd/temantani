const { WorkReport } = require('../models');
const errors = require('../../support/errors');
const AcceptableStatus = require('../enums/AcceptableStatus');

class WorkReportService {
    static async isWorkReportNotExistsForWeek(projectId, workerId, week) {
        const workReport = await WorkReport.findOne({
            where: {
                projectId,
                workerId,
                week,
            }
        });

        if (workReport) {
            throw errors.BadRequest("Work report already exists for the week");
        }

        return true;
    }

    static async isTransitionAllowed(id, status) {
        const workReport = await WorkReport.findByPk(id);
        if (status && AcceptableStatus.canTransition(workReport.status, status) === false) {
            throw errors.BadRequest("Work report status transition is not allowed");
        }

        return true;
    }

    static async isWorkReportStatusPending(id) {
        const workReport = await WorkReport.findByPk(id);
        if (workReport.status !== AcceptableStatus.PENDING) {
            throw errors.BadRequest("Work report is already verified");
        }

        return true;
    }
}

module.exports = WorkReportService;

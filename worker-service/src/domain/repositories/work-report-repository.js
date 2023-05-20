const { WorkReport } = require('../models/index.js');

module.exports = () => {
    const repository = {
        getAllWorkReports: () => {
            return WorkReport.findAll();
        },
        getWorkReportById: (id) => {
            return WorkReport.findOne({ where: { id } });
        },
        createWorkReport: (body) => {
            return WorkReport.create(body);
        },
        updateWorkReport: (id, body) => {
            return WorkReport.update(body, { where: { id } });
        },
        deleteWorkReport: async (id) => {
            return WorkReport.destroy({ where: { id } });
        },
    };

    return repository;
};

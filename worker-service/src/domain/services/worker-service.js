const { Worker } = require('../models');
const errors = require('../../support/errors');

class WorkerService {
    static async verifyWorkerExists(workerId) {
        const worker = await Worker.findByPk(workerId);
        if (!worker) {
            console.log("Worker does not exist");
            throw errors.BadRequest("Worker does not exist");
        }

        return true;
    }
}

module.exports = WorkerService;

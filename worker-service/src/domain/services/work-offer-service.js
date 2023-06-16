const { WorkOffer } = require('../models');
const errors = require('../../support/errors');
const AcceptableStatus = require('../enums/AcceptableStatus');

class WorkOfferService {
    static async verifyWorkOfferExists(workOfferId) {
        const workOffer = await WorkOffer.findByPk(workOfferId);
        if (!workOffer) {
            throw errors.BadRequest("Work offer does not exist");
        }

        return true;
    }
    
    static async verifyWorkOfferDoesNotExist(projectId, workerId) {
        const workOffer = await WorkOffer.findOne({
            where: {
                projectId,
                workerId,
            }
        });

        if (workOffer) {
            throw errors.BadRequest("Worker already has a work offer for the project");
        }

        return true;
    }

    static async isTransitionAllowed(id, status) {
        const workOffer = await WorkOffer.findByPk(id);
        if (status && AcceptableStatus.canTransition(workOffer.status, status) === false) {
            throw errors.BadRequest("Work offer status transition is not allowed");
        }

        return true;
    }

    static async isWorkOfferStatusPending(id) {
        const workOffer = await WorkOffer.findByPk(id);
        if (workOffer.status !== AcceptableStatus.PENDING) {
            throw errors.BadRequest("Work offer status is not pending");
        }

        return true;
    }
}

module.exports = WorkOfferService;

const repositories = require('../../domain/repositories');
const useCases = require('../../application/use-cases');
const controllers = require('../controllers');

module.exports = function () {
    const repository = new repositories.WorkOfferRepository();
    const usecase = useCases.workOfferUseCases(repository);
    const controller = controllers.workOfferController(usecase);

    return controller;
}
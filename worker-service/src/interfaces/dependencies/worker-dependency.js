const repositories = require('../../domain/repositories');
const useCases = require('../../application/use-cases');
const controllers = require('../controllers');

module.exports = function (eventPublisher) {
    const repository = new repositories.WorkerRepository(eventPublisher);
    const usecase = useCases.workerUseCases(repository);
    const controller = controllers.workerController(usecase);

    return controller;
}
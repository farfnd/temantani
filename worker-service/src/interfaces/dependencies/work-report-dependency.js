const repositories = require('../../domain/repositories');
const useCases = require('../../application/use-cases');
const controllers = require('../controllers');

module.exports = function () {
    const repository = new repositories.WorkReportRepository();
    const usecase = useCases.workReportUseCases(repository);
    const controller = controllers.workReportController(usecase);

    return controller;
}
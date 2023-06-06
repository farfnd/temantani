const repositories = require('../../domain/repositories');
const useCases = require('../../application/use-cases');
const controllers = require('../controllers');

module.exports = function () {
    const repository = new repositories.ProjectRepository();
    const usecase = useCases.projectUseCases(repository);
    const controller = controllers.projectController(usecase);

    return controller;
}
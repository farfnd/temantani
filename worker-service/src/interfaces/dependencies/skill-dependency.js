const repositories = require('../../domain/repositories');
const useCases = require('../../application/use-cases');
const controllers = require('../controllers');

module.exports = function () {
    const repository = new repositories.SkillRepository();
    const usecase = useCases.skillUseCases(repository);
    const controller = controllers.skillController(usecase);

    return controller;
}
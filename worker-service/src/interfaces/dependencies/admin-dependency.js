const repositories = require('../../domain/repositories');
const useCases = require('../../application/use-cases');
const controllers = require('../controllers');

module.exports = function () {
    const repository = new repositories.AdminRepository();
    const usecase = useCases.adminUseCases(repository);
    const controller = controllers.adminController(usecase);

    return controller;
}
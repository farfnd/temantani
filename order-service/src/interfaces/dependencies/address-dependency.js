const repositories = require('../../domain/repositories');
const useCases = require('../../application/use-cases');
const controllers = require('../controllers');

module.exports = function () {
    const repository = new repositories.AddressRepository();
    const usecase = useCases.addressUseCases(repository);
    const controller = controllers.addressController(usecase);

    return controller;
}
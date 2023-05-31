const repositories = require('../../domain/repositories');
const useCases = require('../../application/use-cases');
const controllers = require('../controllers');

module.exports = function (eventPublisher) {
    const repository = new repositories.ProductRepository(eventPublisher);
    const usecase = useCases.productUseCases(repository);
    const controller = controllers.productController(usecase);

    return controller;
}
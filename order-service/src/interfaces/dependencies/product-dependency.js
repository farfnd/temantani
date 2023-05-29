const repositories = require('../../domain/repositories');
const useCases = require('../../application/use-cases');
const controllers = require('../controllers');

module.exports = function () {
    const repository = new repositories.ProductRepository();
    const usecase = useCases.productUseCases(repository);
    const controller = controllers.productController(usecase);

    return controller;
}
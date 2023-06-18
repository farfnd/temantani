const repositories = require('../../domain/repositories');
const useCases = require('../../application/use-cases');
const controllers = require('../controllers');

module.exports = function (eventPublisher, paymentGatewayService) {
    const repository = new repositories.OrderRepository(eventPublisher);
    const usecase = useCases.orderUseCases(repository);
    const controller = controllers.orderController(usecase, paymentGatewayService);

    return controller;
}
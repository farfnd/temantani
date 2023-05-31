const repositories = require('../../domain/repositories');
const useCases = require('../../application/use-cases');
const controllers = require('../controllers');

module.exports = function () {
    const repository = new repositories.InvoiceRepository();
    const usecase = useCases.invoiceUseCases(repository);
    const controller = controllers.invoiceController(usecase);

    return controller;
}
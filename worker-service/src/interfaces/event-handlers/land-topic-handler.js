const useCases = require("../../application/use-cases");
const repositories = require("../../domain/repositories");

async function handle(message) {
    await handleNewLand(message)
}

async function handleNewLand(message) {
    try {
        console.log('Received message:', message);
        const landRepo = new repositories.LandRepository();
        const landUseCase = useCases.landUseCases(landRepo);
        const land = await landUseCase.create(message);

        console.log('New land created');
    } catch (error) {
        console.error('Error creating land from message:', error);
        return;
    }
}

module.exports = { handle };
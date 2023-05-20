const useCases = require("../../application/use-cases/index.js");
const repositories = require("../../domain/repositories/index.js");

async function handleNewLand(message) {
    try {
        console.log('Received message:', message);
        const landRepo = repositories.landRepository();
        const landUseCase = useCases.landUseCases(landRepo);
        const land = await landUseCase.createLandFromMessage(message);

        console.log('New land created');
    } catch (error) {
        console.error('Error creating land from message:', error);
    }
}

module.exports = { handleNewLand };
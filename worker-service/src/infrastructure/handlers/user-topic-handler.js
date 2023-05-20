const useCases = require("../../application/use-cases/index.js");
const repositories = require("../../domain/repositories/index.js");

async function handleNewUser(message) {
    try {
        console.log('Received message:', message);
        const farmerRepo = repositories.farmerRepository();
        const farmerUseCase = useCases.farmerUseCases(farmerRepo);
        const farmer = await farmerUseCase.createFarmerFromMessage(message);
        if (!farmer) {
            return;
        }
        console.log('New farmer created');
    } catch (error) {
        console.error('Error creating farmer from message:', error);
    }
}

module.exports = { handleNewUser };
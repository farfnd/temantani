const useCases = require("../../application/use-cases/index.js");
const repositories = require("../../domain/repositories/index.js");

async function handleNewUser(message) {
    try {
        console.log('Received message:', message);
        const adminRepo = repositories.adminRepository();
        const adminUseCase = useCases.adminUseCases(adminRepo);
        const admin = await adminUseCase.createAdminFromMessage(message);
        if (!admin) {
            return;
        }
        console.log('New admin created');
    } catch (error) {
        console.error('Error creating admin from message:', error);
    }
}

module.exports = { handleNewUser };
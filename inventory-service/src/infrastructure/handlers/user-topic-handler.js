const useCases = require("../../application/use-cases/index.js");
const repositories = require("../../domain/repositories/index.js");
const UserEventType = require('../../domain/enums/UserEventType');
const AdminRole = require("../../domain/enums/InventoryAdminRole");

async function handle(message) {
    const type = message.type;
    delete message.type;
    switch (type) {
        case UserEventType.ROLE_ACTIVATED:
            await handleNewUser(message);
            break;

        default:
            break;
    }
}

async function handleNewUser(message) {
    try {
        message = validateMessage(message);
        const adminRepo = repositories.adminRepository();
        const adminUseCase = useCases.adminUseCases(adminRepo);
        const admin = await adminUseCase.createAdmin(message);
        if (!admin) {
            return;
        }
        console.log('New admin created');
    } catch (error) {
        console.error('Error creating admin from message:', error);
    }
}

function validateMessage(message) {
    const adminRoles = Object.values(AdminRole);
    const userRoles = message.roles.split(','); // Split the roles string into an array
    const hasAdminRole = userRoles.some((role) => adminRoles.includes(role.trim()));

    if (!hasAdminRole) {
        throw new Error('User does not have a valid admin role');
    }

    delete message.roles;
    return message;
};

module.exports = { handle };
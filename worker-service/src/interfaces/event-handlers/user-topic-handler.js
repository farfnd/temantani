const useCases = require("../../application/use-cases");
const repositories = require("../../domain/repositories");
const UserEventType = require('../../domain/enums/UserEventType');
const WorkerAdminRole = require('../../domain/enums/WorkerAdminRole');
const UserRole = require('../../domain/enums/UserRole');

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
    const userRoles = message.roles.split(','); // Split the roles string into an array

    const hasWorkerRole = userRoles.includes(UserRole.WORKER);
    const adminRoles = Object.values(WorkerAdminRole);
    const hasAdminRole = userRoles.some((role) => adminRoles.includes(role.trim()));

    if (!hasWorkerRole && !hasAdminRole) {
        console.log('User does not have a valid worker role');
        return;
    }

    delete message.roles;

    if (hasWorkerRole) {
        await handleNewFarmer(message);
    } else if (hasAdminRole) {
        await handleNewAdmin(message);
    }

};

async function handleNewAdmin(message) {
    try {
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

async function handleNewFarmer(message) {
    try {
        const farmerRepo = repositories.farmerRepository;
        const farmerUseCase = useCases.farmerUseCases(farmerRepo);
        const farmer = await farmerUseCase.create(message);
        if (!farmer) {
            return;
        }
        console.log('New farmer created');
    } catch (error) {
        console.error('Error creating farmer from message:', error);
    }
}

module.exports = { handle };
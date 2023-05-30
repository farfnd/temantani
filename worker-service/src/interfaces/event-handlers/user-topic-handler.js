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
    
    message.id = message.userId;
    delete message.userId;

    if (hasWorkerRole) {
        await handleNewWorker(message);
    } else if (hasAdminRole) {
        await handleNewAdmin(message);
    }

};

async function handleNewAdmin(message) {
    try {
        const adminRepo = new repositories.AdminRepository();
        const adminUseCase = useCases.adminUseCases(adminRepo);
        const admin = await adminUseCase.create(message);
        if (!admin) {
            return;
        }
        console.log('New admin created');
    } catch (error) {
        console.error('Error creating admin from message:', error);
        return;
    }
}

async function handleNewWorker(message) {
    try {
        const workerRepo = new repositories.WorkerRepository();
        const workerUseCase = useCases.workerUseCases(workerRepo);
        const worker = await workerUseCase.create(message);
        if (!worker) {
            return;
        }
        console.log('New worker created');
    } catch (error) {
        console.error('Error creating worker from message:', error);
        return;
    }
}

module.exports = { handle };
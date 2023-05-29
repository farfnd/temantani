const useCases = require("../../application/use-cases");
const repositories = require("../../domain/repositories");
const UserEventType = require('../../domain/enums/UserEventType');
const OrderAdminRole = require('../../domain/enums/OrderAdminRole');
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

    const hasBuyerRole = userRoles.includes(UserRole.BUYER);
    const adminRoles = Object.values(OrderAdminRole);
    const hasAdminRole = userRoles.some((role) => adminRoles.includes(role.trim()));

    if (!hasBuyerRole && !hasAdminRole) {
        console.log('User does not have a valid worker role');
        return;
    }

    delete message.roles;

    if (hasBuyerRole) {
        await handleNewUser(message);
    } else if (hasAdminRole) {
        await handleNewAdmin(message);
    }

};

async function handleNewAdmin(message) {
    try {
        const adminRepo = new repositories.AdminRepository();
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

async function handleNewUser(message) {
    try {
        const userRepo = new repositories.UserRepository();
        const userUseCase = useCases.userUseCases(userRepo);
        const user = await userUseCase.create({
            id: message.userId,
            ...message,
        });
        if (!user) {
            return;
        }
        console.log('New user created');
    } catch (error) {
        console.error('Error creating user from message:', error);
    }
}

module.exports = { handle };
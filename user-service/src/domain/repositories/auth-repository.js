const { hashPassword, comparePassword, generateJwt } = require("../../utils.js");
const models = require("../models/index.js");
const UserRegistered = require("../events/user-registered.js");

module.exports = (eventPublisher) => {
    const { User, Role, UserRoles } = models;
    const repository = {
        register: async (body) => {
            const { roles, ...userBody } = body; // Extract roles from request body
            userBody.password = hashPassword(userBody.password); // Hash password

            let createdUser;
            try {
                createdUser = await User.create(userBody); // Create user without roles
            } catch (error) {
                throw error;
            }

            // Add user roles if roles array is provided
            if (roles && Array.isArray(roles)) {
                const userRoles = await Promise.all(
                    roles.map(async (role) => {
                        const foundRole = await Role.findOne({ where: { name: role } });
                        if (foundRole) {
                            return { userId: createdUser.id, roleId: foundRole.id };
                        }
                    })
                );

                await UserRoles.bulkCreate(userRoles.filter(Boolean));
            }

            const user = await User.findByPk(createdUser.id, { include: [Role] }); // Get user with roles

            // Raise the UserRegistered domain event
            const userRegisteredEvent = new UserRegistered(user);
            eventPublisher.publish(userRegisteredEvent);
        },
        login: async (email, password) => {
            try {
                const user = await User.findOne({ where: { email } });

                if (user && comparePassword(password, user.password)) {
                    return {
                        accessToken: generateJwt({ id: user.id }),
                    };
                } else {
                    throw new Error("Authentication Failed");
                }
            } catch (error) {
                throw error;
            }
        },
    };

    return repository;
};

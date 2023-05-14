import { hashPassword, comparePassword, generateJwt, getRoleIdByName } from "../../utils.js";
import User from "../models/User.js";
import UserRole from "../models/UserRole.js";
import UserRegistered from "../events/user-registered.js";

export default (eventPublisher) => {
    const repository = {
        register: async (body) => {
            const { roles, ...userBody } = body; // Extract roles from request body
            userBody.password = hashPassword(userBody.password); // Hash password
            try {
                const [userId] = await User.create(userBody); // Create user without roles
            } catch (error) {
                console.log(userBody)
                console.log(error)
            }

            // Add user roles if roles array is provided
            if (roles && Array.isArray(roles)) {
                const userRoles = await Promise.all(roles.map(async role => {
                    const roleId = await getRoleIdByName(role);
                    return { user_id: userId, role_id: roleId };
                }));
                
                userRoles.forEach(async userRole => {
                    console.log(userRole)
                    await UserRole.create(userRole);
                });
            }

            const user = await User.getWithUserRoles(userId).first(); // Get user with roles

            // Raise the UserRegistered domain event
            const userRegisteredEvent = new UserRegistered(user);
            eventPublisher.publish(userRegisteredEvent);    
        },
        login: (email, password) => {
            return new Promise((resolve, reject) => {
                User.find({ email })
                .first()
                .then((data) => {
                    if (data) {
                            console.log(data)
                            if (comparePassword(password, data.password)) {
                                resolve({
                                    accessToken: generateJwt({ id: data.id }),
                                });
                            } else {
                                reject({
                                    message: "Authentication Failed",
                                });
                            }
                        } else {
                            reject({
                                message: "Authentication Failed",
                            });
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
    };

    return repository;
};

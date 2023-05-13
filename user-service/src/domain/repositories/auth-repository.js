import { hashPassword, comparePassword, generateJwt, getRoleIdByName } from "../../utils.js";
import User from "../models/User.js";
import UserRole from "../models/UserRole.js";

export default () => {
    const repository = {
        register: async (body) => {
            const { roles, ...userBody } = body; // Extract roles from request body
            userBody.password = hashPassword(userBody.password); // Hash password
            const [userId] = await User.create(userBody); // Create user without roles
            console.log(userId)

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

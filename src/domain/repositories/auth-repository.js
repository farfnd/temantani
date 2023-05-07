import { comparePassword, generateJwt } from "../../utils.js";
import User from "../models/User.js";

export default () => {
    const repository = {
        register: (body) => {
            return User.create(body);
        },
        login: (email, password) => {
            return new Promise((resolve, reject) => {
                User.find({ email })
                    .first()
                    .then((data) => {
                        if (data) {
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

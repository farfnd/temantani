const { hashPassword } = require('../../support/helpers');
const path = require("path");

module.exports = (usecase) => {
    const controller = {
        getAllUsers: async (_, res) => {
            try {
                const data = await usecase.getAllUsers();
                res.send(data);
            } catch (error) {
                res.statusCode = 404;
                res.send(error);
            }
        },

        getUserById: async (req, res) => {
            try {
                const data = await usecase.getUserById(req.params.id);
                res.send(data);
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        },

        getCurrentUser: async (req, res) => {
            try {
                const data = await usecase.getUserById(req.user.id);
                res.send(data);
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        },

        createUser: async (req, res) => {
            try {
                const body = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword(req.body.password),
                    phoneNumber: req.body.phoneNumber,
                };
                await usecase.createUser(body);
                res.status(200).json({
                    message: "success",
                });
            } catch (error) {
                res.status(500).json(error);
            }
        },

        updateUserById: async (req, res) => {
            try {
                if (req.body.password) {
                    req.body.password = hashPassword(req.body.password);
                }
                await usecase.updateUser(req.params.id, req.body);
                res.status(200).json({
                    message: "success",
                });
            } catch (error) {
                res.status(500).json(error);
            }
        },

        updateCurrentUser: async (req, res) => {
            console.log(req);
            try {
                let isFileUploaded = false;

                if (!req.files) {
                    await usecase.updateUser(req.user.id, req.body);
                } else {
                    const file = req.files.image;
                    const fileName = `${Date.now()}-${file.name}`;
                    const filePath = path.join(__dirname, "../../../public/images", fileName);

                    await new Promise((resolve, reject) => {
                        file.mv(filePath, (err) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });

                    const updateData = {
                        ...req.body,
                        profilePictureUrl: fileName,
                    };

                    await usecase.updateUser(req.user.id, updateData);
                    isFileUploaded = true;
                }

                const data = await usecase.getUserById(req.user.id);

                res.status(200).json({
                    data,
                    message: "User data updated",
                });
            } catch (error) {
                res.status(500).json(error);
            }
        },

        deleteUserById: async (req, res) => {
            try {
                await usecase.deleteUser(req.params.id);
                res.status(200).json({
                    message: "success",
                });
            } catch (error) {
                res.status(500).json(error);
            }
        },
    };

    return controller;
};

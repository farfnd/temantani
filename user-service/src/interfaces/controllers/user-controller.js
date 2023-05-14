const { hashPassword } = require('../../utils.js');

module.exports = (usecase) => {
    const controller = {
        getAllUsers: async (_, res) => {
            try {
                const data = await usecase.getAllUsers();
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                res.send(error);
            }
        },

        getUserById: async (req, res) => {
            try {
                const data = await usecase.getUserById(req.params.id);
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                res.send(error);
            }
        },

        getCurrentUser: async (req, res) => {
            try {
                const data = await usecase.getUserById(req.user.id);
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                res.send(error);
            }
        },

        createUser: async (req, res) => {
            try {
                const body = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword(req.body.password),
                    phone: req.body.phone,
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

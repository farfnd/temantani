const { hashPassword } = require('../../utils.js');
const { validateFarmer } = require('../../application/validators/farmer-validator');

module.exports = (usecase) => {
    const controller = {
        getAllFarmers: async (_, res) => {
            try {
                const data = await usecase.getAllFarmers();
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                res.send(error);
            }
        },

        getFarmerById: async (req, res) => {
            try {
                const data = await usecase.getFarmerById(req.params.id);
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                res.send(error);
            }
        },

        getCurrentFarmer: async (req, res) => {
            try {
                const data = await usecase.getFarmerById(req.user.id);
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                res.send(error);
            }
        },

        createFarmer: async (req, res) => {
            try {
                const body = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                };
                await usecase.createFarmer(body);
                res.status(200).json({
                    message: "success",
                });
            } catch (error) {
                res.status(500).json(error);
            }
        },

        updateFarmerById: async (req, res) => {
            try {
                if (req.body.password) {
                    req.body.password = hashPassword(req.body.password);
                }
                await usecase.updateFarmer(req.params.id, req.body);
                res.status(200).json({
                    message: "success",
                });
            } catch (error) {
                res.status(500).json(error);
            }
        },

        deleteFarmerById: async (req, res) => {
            try {
                await usecase.deleteFarmer(req.params.id);
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

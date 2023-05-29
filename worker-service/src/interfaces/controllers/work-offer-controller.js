const { hashPassword } = require('../../support/helpers.js');
const { createRules, updateRules, validate } = require('../../application/validators/work-offer-validator.js');

module.exports = (usecase) => {
    const controller = {
        index: async (_, res) => {
            try {
                const data = await usecase.getAll()
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                res.send(error);
            }
        },

        show: async (req, res) => {
            try {
                const data = await usecase.getById(req.params.id);
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                res.send(error);
            }
        },

        store: [
            createRules,
            validate,
            async (req, res) => {
                try {
                    const body = {
                        projectId: req.body.projectId,
                        workerId: req.body.workerId,
                        adminId: req.body.adminId,
                        status: req.body.status,
                        workContractUrl: req.body.workContractUrl,
                    };
                    await usecase.create(body);
                    res.status(200).json({
                        message: 'success',
                    });
                } catch (error) {
                    res.status(500).json(error);
                }
            },
        ],

        update: [
            updateRules,
            validate,
            async (req, res) => {
                try {
                    if (req.body.password) {
                        req.body.password = hashPassword(req.body.password);
                    }
                    await usecase.update(req.params.id, req.body);
                    res.status(200).json({
                        message: "success",
                    });
                } catch (error) {
                    res.status(500).json(error);
                }
            },
        ],

        destroy: async (req, res) => {
            try {
                await usecase.delete(req.params.id);
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

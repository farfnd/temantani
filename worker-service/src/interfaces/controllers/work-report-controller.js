const { createRules, updateRules, validate } = require('../../application/validators/work-report-validator.js');
const errors = require('../../support/errors');

module.exports = (usecase) => {
    const controller = {
        index: async (req, res) => {
            try {
                let data;
                if (req.user.roles.some(role => role.includes('ADMIN'))) {
                    data = await usecase.getAll();
                } else {
                    data = await usecase.find({ workerId: req.user.id });
                }
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                res.send(error);
            }
        },

        show: async (req, res) => {
            try {
                let data;
                if (req.user.roles.some(role => role.includes('ADMIN'))) {
                    data = await usecase.getById(req.params.id);
                } else {
                    data = await usecase.findOne({ 
                        id: req.params.id,
                        workerId: req.user.id
                    });
                }
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
                        workerId: req.user.id,
                        week: req.body.week,
                        description: req.body.description,
                        proof: req.body.proof,
                    };
                    
                    await usecase.create(body);
                    res.status(200).json({
                        message: 'success',
                    });
                } catch (error) {
                    res.status(error.status).json(error.message);
                }
            },
        ],

        update: async (req, res) => {
            try {
                await usecase.update(req.params.id, req.body);
                res.status(200).json({
                    message: "success",
                });
            } catch (error) {
                res.status(500).json(error);
            }
        },

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

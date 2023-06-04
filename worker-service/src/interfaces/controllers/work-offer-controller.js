const { createRules, updateRules, validate } = require('../../application/validators/work-offer-validator.js');
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
                    data = await usecase.find({ 
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
                    if(req.body.adminId && req.body.adminId !== req.user.id) {
                        throw errors.BadRequest("Admin ID does not match with the logged in user");
                    }

                    const body = {
                        adminId: req.user.id,
                        projectId: req.body.projectId,
                        workerId: req.body.workerId,
                        status: req.body.status,
                        workContractAccepted: req.body.workContractAccepted,
                    };
                    
                    const data = await usecase.create(body);
                    res.status(200).json({
                        data,
                        message: 'Work offer created',
                    });
                } catch (error) {
                    res.status(error.status).json(error.message);
                }
            },
        ],

        update: [
            updateRules,
            validate,
            async (req, res) => {
                try {
                    await usecase.update(req.params.id, req.body)
                    const data = await usecase.getById(req.params.id)
                    res.status(200).json({
                        data,
                        message: "Work offer updated",
                    });
                } catch (error) {
                    res.status(error.status).json(error.message);
                }
            },
        ],

        destroy: async (req, res) => {
            try {
                const data = await usecase.getById(req.params.id)
                await usecase.delete(req.params.id)
                res.status(200).json({
                    data,
                    message: "Work offer deleted",
                });
            } catch (error) {
                res.status(500).json(error);
            }
        },
    };

    return controller;
};

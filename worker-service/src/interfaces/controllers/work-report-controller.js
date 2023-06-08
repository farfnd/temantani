const { getAllRules, createRules, updateRules, validate } = require('../../application/validators/work-report-validator.js');
const errors = require('../../support/errors');

module.exports = (usecase) => {
    const controller = {
        index: [
            getAllRules,
            validate,
            async (req, res) => {
                try {
                    let include = [];
                    if (req.query.include) {
                        include = req.query.include.split(',');
                    }

                    let data;
                    if (req.user.roles.some(role => role.includes('ADMIN'))) {
                        data = await usecase.getAll({ where: req.query.filter, include })
                    } else {
                        data = await usecase.find({ workerId: req.user.id, ...req.query.filter }, include);
                    }
                    res.send(data);
                } catch (error) {
                    res.statusCode = 500;
                    res.send(error);
                }
            },
        ],

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
                    
                    const data = await usecase.create(body);
                    res.status(200).json({
                        data,
                        message: 'Work report created',
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
                    let body;
                    if (req.user.roles.some(role => role.includes('ADMIN'))) {
                        body = {
                            status: req.body.status,
                        };
                    } else {
                        body = {
                            description: req.body.description,
                            proof: req.body.proof,
                        };
                    }
                    
                    await usecase.update(req.params.id, req.body)
                    const data = await usecase.getById(req.params.id)
                    res.status(200).json({
                        data,
                        message: 'Work report updated',
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
                    message: 'Work report deleted',
                });
            } catch (error) {
                res.status(500).json(error);
            }
        },
    };

    return controller;
};

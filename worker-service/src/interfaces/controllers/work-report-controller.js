const { getAllRules, createRules, updateRules, validate } = require('../../application/validators/work-report-validator.js');
const AcceptableStatus = require('../../domain/enums/AcceptableStatus.js');
const errors = require('../../support/errors');
const path = require("path")

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
                        data = await usecase.find({ workerId: req.user.id, ...req.query.filter }, { include });
                    }
                    res.send(data);
                } catch (error) {
                    console.log(error)
                    res.statusCode = 500;
                    res.send(error);
                }
            },
        ],

        show: async (req, res) => {
            try {
                let include = {};
                if (req.query.include) {
                    include = req.query.include.split(',');
                }

                let data;
                if (req.user.roles.some(role => role.includes('ADMIN'))) {
                    data = await usecase.getById(req.params.id, { include });
                } else {
                    data = await usecase.findOne({
                        id: req.params.id,
                        workerId: req.user.id
                    }, { include });
                }
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                console.log(error)
                res.send(error);
            }
        },

        store: [
            createRules,
            validate,
            async (req, res) => {
                console.log(req.body)
                if (!req.files) {
                    res.status(400).json({
                        message: "No files were uploaded"
                    })
                    return
                }
                const file = req.files.proof
                const fileName = `${Date.now()}-${file.name}`
                const filePath = path.join(__dirname, "../../../public/images", fileName)
                file.mv(filePath, async (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json(err)
                        return
                    }
                    try {
                        const body = {
                            projectId: req.body.projectId,
                            workerId: req.user.id,
                            week: req.body.week,
                            description: req.body.description,
                            proof: fileName
                        };

                        const data = await usecase.create(body);
                        res.status(200).json({
                            data,
                            message: 'Work report created',
                        });
                    } catch (error) {
                        console.log(error)
                        res.status(error.status).json(error.message);
                    }
                })
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
                            verifierId: (req.body.status === AcceptableStatus.PENDING ? null : req.user.id),
                            rejectionMessage: (req.body.status === AcceptableStatus.REJECTED ? req.body.rejectionMessage : null),
                        };
                    } else {
                        body = { description: req.body.description }
                        if (req.files) {
                            const file = req.files.proof
                            const fileName = `${Date.now()}-${file.name}`
                            const filePath = path.join(__dirname, "../../../public/images", fileName)
                            file.mv(filePath, (err) => {
                                if (err) {
                                    console.log(err)
                                    res.status(500).json(err)
                                    return
                                }
                            })
    
                            body.proof = fileName
                        }
                    }
                    console.log(req.params.id, body)
                    await usecase.update(req.params.id, body)
                    const data = await usecase.getById(req.params.id)
                    res.status(200).json({
                        data,
                        message: 'Work report updated',
                    });
                } catch (error) {
                    console.log(error)
                    res.status(error.status).json(error.message);
                }
            },
        ],

        destroy: async (req, res) => {
            try {
                const data = await usecase.getById(req.params.id)
                if (data.workerId !== req.user.id) {
                    throw errors.Forbidden("This action is not allowed");
                }
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

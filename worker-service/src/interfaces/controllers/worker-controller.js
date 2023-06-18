const { hashPassword } = require('../../support/helpers.js');
const errors = require('../../support/errors.js');
const { getAllRules, getByIdRules, validate } = require('../../application/validators/worker-validator.js');

module.exports = (usecase) => {
    const controller = {
        index: [
            getAllRules,
            validate,
            async (req, res) => {
                try {
                    console.log(req.query.filter)
                    const data = await usecase.getAll({ where: req.query.filter })
                    res.send(data);
                } catch (error) {
                    res.statusCode = 500;
                    console.log(error);
                    res.send(error);
                }
            }
        ],

        show: [
            getByIdRules,
            validate,
            async (req, res) => {
                try {
                    let include = {};
                    if (req.query.include) {
                        include = req.query.include.split(',');
                    }

                    const data = await usecase.getById(
                        req.params.id,
                        { include }
                    );
                    res.send(data);
                } catch (error) {
                    res.statusCode = 500;
                    console.log(error);
                    res.send(error);
                }
            }
        ],

        getCurrentWorker: async (req, res) => {
            try {
                const data = await usecase.getById(req.user.id);
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                res.send(error);
            }
        },

        update: async (req, res) => {
            try {
                await usecase.update(req.user.id, req.body);
                const data = await usecase.getById(req.user.id);
                res.status(200).json({
                    data,
                    message: "success",
                });
            } catch (error) {
                console.log(error);
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

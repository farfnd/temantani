const { getAllRules, getByIdRules, validate } = require('../../application/validators/project-validator.js');

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
                    const include = req.query.include.split(',');

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
    };

    return controller;
};

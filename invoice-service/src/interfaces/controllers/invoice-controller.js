module.exports = (usecase) => {
    const controller = {
        index: async (_, res) => {
            try {
                let data;
                if (req.user.roles.some(role => role.includes('ADMIN'))) {
                    data = await usecase.getAll({ where: req.query.filter })
                } else {
                    data = await usecase.find({ userId: req.user.id, ...req.query.filter });
                }
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        show: async (req, res) => {
            try {
                const data = await usecase.findOne({
                    orderId: req.params.id
                })
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        store: async (req, res) => {
            try {
                await usecase.create(req.body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        update: async (req, res) => {
            try {
                await usecase.update(req.params.id, req.body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        destroy: async (req, res) => {
            try {
                await usecase.delete(req.params.id)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        }
    };

    return controller;
}
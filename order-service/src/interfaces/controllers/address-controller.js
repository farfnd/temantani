module.exports = (usecase) => {
    const controller = {
        index: async (req, res) => {
            try {
                let data;
                if (req.user.roles.some(role => role.includes('ADMIN'))) {
                    data = await usecase.getAll();
                } else {
                    data = await usecase.find({ userId: req.user.id });
                }
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
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
                        userId: req.user.id
                    });
                }
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        store: async (req, res) => {
            try {
                req.body.userId = req.user.id
                const data = await usecase.create(req.body)
                res.status(200).json({
                    data,
                    message: "Address created"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        update: async (req, res) => {
            try {
                await usecase.update(req.params.id, req.body)
                const data = await usecase.getById(req.params.id)
                res.status(200).json({
                    data,
                    message: "Address updated"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        destroy: async (req, res) => {
            try {
                await usecase.update(req.params.id, {
                    userId: null
                })
                const data = await usecase.getById(req.params.id)
                res.status(200).json({
                    data,
                    message: "Address deleted"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        }
    };

    return controller;
}
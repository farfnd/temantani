module.exports = (usecase) => {
    const controller = {
        index: async (_, res) => {
            try {
                const data = await usecase.getAll()
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        show: async (req, res) => {
            try {
                const data = await usecase.getById(req.params.id)
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        store: async (req, res) => {
            try {
                const data = await usecase.create(req.body)
                res.status(200).json({
                    data,
                    message: "Product created"
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
                    message: "Product updated"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        destroy: async (req, res) => {
            try {
                const data = await usecase.getById(req.params.id)
                await usecase.delete(req.params.id)
                res.status(200).json({
                    data,
                    message: "Product deleted"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        }
    };

    return controller;
}
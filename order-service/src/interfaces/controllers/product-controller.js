module.exports = (usecase) => {
    const controller = {
        index: async (_, res) => {
            try {
                const data = await usecase.getAll()
                res.send(data)
            } catch (error) {
                res.status(error.status || 500).json(error.message);
            }
        },

        show: async (req, res) => {
            try {
                const data = await usecase.getById(req.params.id)
                res.send(data)
            } catch (error) {
                res.status(error.status || 500).json(error.message);
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
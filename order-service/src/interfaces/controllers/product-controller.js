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
    };

    return controller;
}
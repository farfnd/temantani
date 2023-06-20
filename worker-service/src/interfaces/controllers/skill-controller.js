module.exports = (usecase) => {
    const controller = {
        index: async (_, res) => {
            try {
                const data = await usecase.getAll()
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                res.send(error);
            }
        },

        show: async (req, res) => {
            try {
                const data = await usecase.getById(req.params.id);
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                res.send(error);
            }
        },
    };

    return controller;
};

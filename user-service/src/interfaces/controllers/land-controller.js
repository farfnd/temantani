module.exports = (usecase) => {
    const controller = {
        getAllLands: async (_, res) => {
            try {
                const data = await usecase.getAllLands();
                res.send(data);
            } catch (error) {
                res.statusCode = 404;
                res.send(error);
            }
        },

        getLandById: async (req, res) => {
            try {
                const data = await usecase.getLandById(req.params.id);
                res.send(data);
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        },
    };

    return controller;
};

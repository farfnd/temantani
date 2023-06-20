module.exports = (usecase) => {
    const controller = {
        getAllProjects: async (req, res) => {
            try {
                let include = {};
                if (req.query.include) {
                    include = req.query.include.split(',');
                }
                const data  = await usecase.getAllProjects({ where: req.query.filter }, include)
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                console.log(error);
                res.send(error);
            }
        },

        getProjectById: async (req, res) => {
            try {
                let include = [];
                if (req.query.include) {
                    console.log(req.query.include);
                    include = req.query.include.split(',');
                }

                const data = await usecase.getProjectById(
                    req.params.id,
                    { include }
                );
                res.send(data);
            } catch (error) {
                res.statusCode = 500;
                console.log(error);
                res.send(error);
            }
        },
    };

    return controller;
};

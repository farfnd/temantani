export default (usecase) => {
    const controller = {
        getAllCategories: async (_, res) => {
            try {
                const data = await usecase.getAllCategories()
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        getCategoryById: async (req, res) => {
            try {
                const data = await usecase.getCategoryById(req.params.id)
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        createCategory: async (req, res) => {
            try {
                const body = {
                    name: req.body.name
                }
                await usecase.createCategory(body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        updateCategoryById: async (req, res) => {
            try {
                const body = {
                    name: req.body.name
                }
                await usecase.updateCategory(req.params.id, body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        deleteCategoryById: async (req, res) => {
            try {
                await usecase.deleteCategory(req.params.id)
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
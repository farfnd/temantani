module.exports = (usecase) => {
    const controller = {
        getAllProducts: async (_, res) => {
            try {
                const data = await usecase.getAllProducts()
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        getProductById: async (req, res) => {
            try {
                const data = await usecase.getProductById(req.params.id)
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        createProduct: async (req, res) => {
            try {
                await usecase.createProduct(req.body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        updateProductById: async (req, res) => {
            try {
                await usecase.updateProduct(req.params.id, req.body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        deleteProductById: async (req, res) => {
            try {
                await usecase.deleteProduct(req.params.id)
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
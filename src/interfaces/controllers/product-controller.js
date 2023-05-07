export default (usecase) => {
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
                const body = {
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    image: req.body.image,
                }
                await usecase.createProduct(body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        updateProductById: async (req, res) => {
            try {
                const body = {
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    image: req.body.image,
                }
                await usecase.updateProduct(req.params.id, body)
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
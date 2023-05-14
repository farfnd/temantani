export default (usecase) => {
    const controller = {
        addCart: async (req, res) => {
            try {
                const body = {
                    user_id: req.user.id,
                    product_id: req.body.product_id,
                    quantity: req.body.quantity,
                }
                await usecase.addCart(body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        updateCartById: async (req, res) => {
            try {
                const body = {
                    user_id: req.user.id,
                    product_id: req.body.product_id,
                    quantity: req.body.quantity,
                }
                await usecase.updateCart(req.params.id, body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        deleteCartById: async (req, res) => {
            try {
                await usecase.deleteCart(req.params.id)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        deleteUserCart: async (req, res) => {
            try {
                await usecase.deleteUserCart(req.user.id)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        getUserCart: async (req, res) => {
            try {
                const data = await usecase.getUserCart(req.user.id)
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        getCartById: async (req, res) => {
            try {
                const data = await usecase.getCartById(req.params.id)
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        }
    };

    return controller;
}
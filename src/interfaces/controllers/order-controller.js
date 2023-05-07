export default (usecase) => {
    const controller = {
        checkout: async (req, res) => {
            try {
                const body = {
                    user_id: req.user.id,
                    address_id: req.body.address_id,
                    coupon_id: req.body.coupon_id,
                    cart: req.body.cart,
                    total: req.body.total,
                }
                await usecase.checkout(body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                console.log("errorrrrr", error)
                res.status(500).json(error)
            }
        },

        getAllOrdersByUserId: async (req, res) => {
            try {
                const data = await usecase.getAllOrdersByUserId(req.user.id)
                res.send(data)
            } catch (error) {
                console.log("asdf", error)
                res.statusCode = 500
                res.send(error)
            }
        }
    };

    return controller;
}
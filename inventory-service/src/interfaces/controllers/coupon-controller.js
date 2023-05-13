export default (usecase) => {
    const controller = {
        getAllCoupons: async (_, res) => {
            try {
                const data = await usecase.getAllCoupons()
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        getCouponById: async (req, res) => {
            try {
                const data = await usecase.getCouponById(req.params.id)
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        createCoupon: async (req, res) => {
            try {
                const body = {
                    code: req.body.code,
                    description: req.body.description
                }
                await usecase.createCoupon(body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        updateCouponById: async (req, res) => {
            try {
                const body = {
                    code: req.body.code,
                    description: req.body.description
                }
                await usecase.updateCoupon(req.params.id, body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        deleteCouponById: async (req, res) => {
            try {
                await usecase.deleteCoupon(req.params.id)
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
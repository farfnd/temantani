export default (usecase) => {
    const controller = {
        getAllAddressByUserId: async (req, res) => {
            try {
                const data = await usecase.getAllAddressByUserId(req.user.id)
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        getAddressById: async (req, res) => {
            try {
                const data = await usecase.getAddressById(req.params.id)
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        createAddress: async (req, res) => {
            try {
                const body = {
                    address: req.body.address,
                    user_id: req.user.id
                }
                await usecase.createAddress(body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        updateAddress: async (req, res) => {
            try {
                const body = {
                    address: req.body.address,
                    user_id: req.user.id
                }
                await usecase.updateAddress(req.params.id, body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        deleteAddress: async (req, res) => {
            try {
                await usecase.deleteAddress(req.params.id)
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
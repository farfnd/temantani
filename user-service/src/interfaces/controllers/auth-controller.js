export default (usecase) => {
    const controller = {
        register: async (req, res) => {
            try {
                await usecase.register(req.body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },
        login: async (req, res) => {
            try {
                const data = await usecase.login(req.body.email, req.body.password)
                res.status(200).json(data)
            } catch (error) {
                res.status(500).json(error)
            }
        }
    };

    return controller;
}
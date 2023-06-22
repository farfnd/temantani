const path = require("path")

module.exports = (usecase) => {
    const controller = {
        index: async (_, res) => {
            try {
                const data = await usecase.getAll()
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        show: async (req, res) => {
            try {
                const data = await usecase.getById(req.params.id)
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        store: async (req, res) => {
            try {
                if (!req.files) {
                    res.status(400).json({
                        message: "No files were uploaded"
                    })
                    return
                }
                const file = req.files.image
                const fileName = `${Date.now()}-${file.name}`
                const filePath = path.join(__dirname, "../../../public/images", fileName)
                file.mv(filePath, async (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json(err)
                        return
                    }
                    const data = await usecase.create({
                        ...req.body,
                        image: fileName
                    })
                    res.status(200).json({
                        data,
                        message: "Product created"
                    })
                })
            } catch (error) {
                console.log(error)
                res.status(500).json(error)
            }
        },

        update: async (req, res) => {
            try {
                if (!req.files ) {
                    await usecase.update(req.params.id, req.body);
                    const data = await usecase.getById(req.params.id);
                    res.status(200).json({
                        data,
                        message: "Product updated"
                    });
                    return;
                }

                const file = req.files.image;
                const fileName = `${Date.now()}-${file.name}`;
                const filePath = path.join(__dirname, "../../../public/images", fileName);
                file.mv(filePath, async (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                        return;
                    }
                    await usecase.update(req.params.id, {
                        ...req.body,
                        image: fileName
                    });
                    const data = await usecase.getById(req.params.id);
                    res.status(200).json({
                        data,
                        message: "Product updated"
                    });
                });
            } catch (error) {
                res.status(500).json(error);
            }
        },

        destroy: async (req, res) => {
            try {
                const data = await usecase.getById(req.params.id)
                await usecase.delete(req.params.id)
                res.status(200).json({
                    data,
                    message: "Product deleted"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        showImage: async (req, res) => {
            try {
                const data = await usecase.getById(req.params.id)
                res.sendFile(path.join(__dirname, "../../../public/images", data.image))
            } catch (error) {
                res.status(500).json(error)
            }
        }
    };

    return controller;
}
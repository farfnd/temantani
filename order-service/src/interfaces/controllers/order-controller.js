const midtrans = require('../../infrastructure/midtrans');
const config = require('../../config');
const { verifySHA512 } = require('../../utils');

module.exports = (usecase) => {
    const controller = {
        index: async (_, res) => {
            try {
                let data;
                if (req.user.roles.some(role => role.includes('ADMIN'))) {
                    data = await usecase.getAll();
                } else {
                    data = await usecase.find({ userId: req.user.id });
                }
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        show: async (req, res) => {
            try {
                let data;
                if (req.user.roles.some(role => role.includes('ADMIN'))) {
                    data = await usecase.getById(req.params.id);
                } else {
                    data = await usecase.find({
                        id: req.params.id,
                        userId: req.user.id
                    });
                }
                res.send(data)
            } catch (error) {
                res.statusCode = 500
                res.send(error)
            }
        },

        store: async (req, res) => {
            try {
                req.body.userId = req.user.id;
                const createdOrder = await usecase.create(req.body);
                
                const midtransService = new midtrans();
                const transactionData = await midtransService.createTransactionToken(createdOrder)
                console.log('transaction:',transactionData);

                res.status(200).json({
                    message: "success",
                    ...transactionData
                })
            } catch (error) {
                res.status(500).json(error.message)
            }
        },

        update: async (req, res) => {
            try {
                await usecase.update(req.params.id, req.body)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        destroy: async (req, res) => {
            try {
                await usecase.delete(req.params.id)
                res.status(200).json({
                    message: "success"
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },

        storePayment: async (req, res) => {
            const {
                order_id,
                transaction_id,
                status_code,
                gross_amount,
                payment_type,
                signature_key
            } = req.body;
            const serverKey = config.midtransServerKey;
            const check = order_id + status_code + gross_amount + serverKey;
            if(verifySHA512(signature_key, check)) {
                try {
                    await usecase.updatePaymentStatus(
                        order_id,
                        transaction_id,
                        status_code,
                        parseInt(gross_amount),
                        payment_type
                    );
                    res.status(200).json({
                        message: "Payment status updated"
                    })
                } catch (error) {
                    res.status(500).json(error.message)
                }
            } else {
                res.status(400).json({
                    message: 'Invalid signature'
                });
            }
        }
    };

    return controller;
}
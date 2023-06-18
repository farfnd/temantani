const { sequelize } = require('../../domain/models');
const { getAllRules, getByIdRules, validate } = require('../../application/validators/order-validator.js');

module.exports = (usecase, paymentGatewayService) => {
    const controller = {
        index: [
            getAllRules,
            validate,
            async (req, res) => {
                try {
                    let include = {};
                    if (req.query.include) {
                        include = req.query.include.split(',');
                    }

                    let data;
                    if (req.user.roles.some(role => role.includes('ADMIN'))) {
                        data = await usecase.getAll({ where: req.query.filter, include })
                    } else {
                        data = await usecase.find({ userId: req.user.id, ...req.query.filter }, include);
                    }
                    return res.send(data);
                } catch (error) {
                    return res.status(500).send(error)
                }
            }
        ],

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
                if(data.length === 0) return res.status(404).json('Order not found');
                return res.send(data)
            } catch (error) {
                return res.status(500).send(error)
            }
        },

        store: async (req, res) => {
            try {
                req.body.userId = req.user.id;

                const t = await sequelize.transaction();

                try {
                    // Create the order within the transaction
                    const createdOrder = await usecase.create(req.body);
                    
                    const transactionData = await paymentGatewayService.createTransactionToken(createdOrder);
                    console.log('transaction: ',transactionData);

                    await t.commit();

                    res.status(200).json({
                        data: createdOrder,
                        message: "Order created",
                        ...transactionData
                    });
                } catch (error) {
                    await t.rollback();
                    console.log('error:',error);
                    throw error;
                }
            } catch (error) {
                res.status(error.status).json(error.message)
            }
        },

        update: async (req, res) => {
            try {
                await usecase.update(req.params.id, req.body)
                const data = await usecase.getById(req.params.id)
                res.status(200).json({
                    data,
                    message: "success"
                })
            } catch (error) {
                console.log(error)
                res.status(error.status).json(error)
            }
        },

        destroy: async (req, res) => {
            try {
                const data = await usecase.getById(req.params.id)
                await usecase.delete(req.params.id)
                res.status(200).json({
                    data,
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
            
            if (status_code !== '200') {
                return res.status(200).json({
                    message: "Order status is not updated as payment is not a success"
                })
            }

            if (paymentGatewayService.verifySignature(signature_key, req.body)) {
                const t = await sequelize.transaction();

                try {
                    await usecase.paymentPaid(
                        order_id,
                        transaction_id,
                        parseInt(gross_amount),
                        payment_type
                    );
                    await t.commit();
                    return res.status(200).json({
                        message: "Payment status updated"
                    })
                } catch (error) {
                    console.log('error:',error);
                    return res.status(error.status).json(error.message)
                }
            } else {
                return res.status(400).json({
                    message: 'Invalid signature'
                });
            }
        }
    };

    return controller;
}
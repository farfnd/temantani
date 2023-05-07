import Order from '../models/Order.js';
import OrderDetail from '../models/OrderDetail.js';
import knex from '../../infrastructure/knex.js';

export default () => {
    const repository = {
        checkout: (body) => {
            knex.transaction(function(trx) {
                carts = body.cart
                return trx
                  .insert({
                      total: body.total,
                      address_id: body.address_id,
                      user_id: body.user_id,
                      coupon_id: body.coupon_id,
                    })
                  .into(tableHeader)
                  .then((ids) =>{
                    const newCart = carts.map((cart) => {
                        return {
                            order_id:ids[0],
                            cart_id: cart
                        }
                    });
                    return trx(tableDetail).insert(newCart);
                });
            })
        },
        getAllOrdersByUserId: (userId) => {
            const knexSql = Order.find({
                filters: {"orders.user_id": userId},
                selectedProps: [
                    'orders.id as _id',
                    'orders.total as _total',
                    'addresses.id as _address_id',
                    'addresses.address as _address_address',
                    'coupons.id as _coupon_id',
                    'coupons.description as _coupon_description',
                    'coupons.percentage as _coupon_percentage',
                    'coupons.fixedDiscount as _coupon_fixedDiscount'
                ]
            })
            .innerJoin("addresses", 'addresses.id','=', 'orders.address_id')
            .innerJoin("coupons", 'coupons.id','=', 'orders.coupon_id')
            return knexnest(knexSql)
        },
    };

    return repository;
};

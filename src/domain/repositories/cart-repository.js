import Cart from '../models/Cart.js';
import knexnest from 'knexnest';

export default () => {
    const repository = {
        getUserCart: (userId) => {
            const knexSql = Cart.find({ user_id: userId }).select(
                'carts.id as _id',
                'carts.quantity as _quantity',
                'products.id as _product_id',
                'products.title as _product_title',
                'products.description as _product_description',
                'products.image as _product_image',
                'products.price as _product_price',
            ).innerJoin("products", 'carts.product_id','=', 'products.id')
            
            return knexnest(knexSql);
        },
        getCartById: (id) => {
            return Cart.find({ 'carts.id': id }).select(
                'carts.id as _id',
                'carts.quantity as _quantity',
                'products.id as _product_id',
                'products.title as _product_title',
                'products.description as _product_description',
                'products.image as _product_image',
                'products.price as _product_price',
            ).innerJoin("products", 'carts.product_id','=', 'products.id');
        },
        addCart: (body) => {
            return Cart.create(body);
        },
        updateCart: (id, body) => {
            return Cart.update(id, body);
        },
        deleteCart: (id) => {
            return Cart.destroy(id);
        },
        deleteUserCart: (userId) => {
            return Cart.find({ user_id: userId }).del();
        }
    };

    return repository;
};


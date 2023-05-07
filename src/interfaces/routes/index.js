import authRoutes from './auth-routes.js';
import addressRoutes from './address-routes.js';
import cartRoutes from './cart-routes.js';
import categoryRoutes from './category-routes.js';
import couponRoutes from './coupon-routes.js';
import customRoutes from './custom-routes.js';
import orderRoutes from './order-routes.js';
import productRoutes from './product-routes.js';
import userRoutes from './user-routes.js';

export default (app) => {
    authRoutes(app);
    customRoutes(app);
    addressRoutes(app);
    cartRoutes(app);
    categoryRoutes(app);
    couponRoutes(app);
    orderRoutes(app);
    productRoutes(app);
    userRoutes(app);
}

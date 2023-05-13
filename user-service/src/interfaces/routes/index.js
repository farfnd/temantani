import authRoutes from './auth-routes.js';
import customRoutes from './custom-routes.js';
import userRoutes from './user-routes.js';

export default (app) => {
    authRoutes(app);
    customRoutes(app);
    userRoutes(app);
}

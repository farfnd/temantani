import authRoutes from './auth-routes.js';
import customRoutes from './custom-routes.js';
import userRoutes from './user-routes.js';

export default (app, eventPublisher) => {
    authRoutes(app, eventPublisher);
    customRoutes(app);
    userRoutes(app);
}

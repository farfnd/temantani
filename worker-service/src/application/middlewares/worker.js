const { toLower } = require("lodash");
const { verifyJwt } = require("../../support/helpers.js");
const UserRoles = require('../../domain/enums/UserRole.js')

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verifyJwt(token);
        req.user = decoded;

        // Check if the user has an admin role
        const isWorker = decoded.roles.some(role => role === UserRoles.WORKER);

        if (isWorker) {
            // User is an admin
            next();
        } else {
            // User is not an admin
            res.statusCode = 403;
            res.send({
                message: 'Access denied. User is not a worker.',
            });
        }
    } catch (error) {
        res.statusCode = 403;
        res.send({
            message: 'Token not valid',
        });
    }
};


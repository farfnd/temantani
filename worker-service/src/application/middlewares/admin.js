const { toLower } = require("lodash");
const { verifyJwt } = require("../../support/helpers.js");

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verifyJwt(token);
        req.user = decoded;

        // Check if the user has an admin role
        const isAdmin = decoded.roles.some(role => toLower(role).startsWith('admin'));

        if (isAdmin) {
            // User is an admin
            next();
        } else {
            // User is not an admin
            res.statusCode = 403;
            res.send({
                message: 'Access denied. User is not an admin.',
            });
        }
    } catch (error) {
        console.log(error);
        res.statusCode = 403;
        res.send({
            message: 'Token not valid',
        });
    }
};


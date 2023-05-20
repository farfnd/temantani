const { body } = require('express-validator');

const validateFarmer = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
];

module.exports = {
    validateFarmer,
};

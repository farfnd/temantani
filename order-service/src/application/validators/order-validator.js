const { body, param, validationResult, query } = require('express-validator');
const OrderStatus = require('../../domain/enums/OrderStatus');

const getAllRules = [
  query('filter.productId').optional().isUUID(),
  query('filter.userId').optional().isUUID(),
  query('filter.addressId').optional().isUUID(),
  query('filter.status').optional().isIn(Object.values(OrderStatus)),
  query('filter.paymentMethod').optional().isString(),
];

const getByIdRules = [
  param('id').notEmpty().isUUID(),
  query('filter.productId').not().exists(),
  query('filter.userId').not().exists(),
  query('filter.addressId').not().exists(),
  query('filter.status').not().exists(),
  query('filter.paymentMethod').not().exists(),

  query('include')
    .optional()
    .custom(value => {
      const includeValues = value.split(',');
      const validValues = [
        'product', 'user', 'address',
      ];

      for (const includeValue of includeValues) {
        if (!validValues.includes(includeValue)) {
          throw new Error('Invalid include value');
        }
      }

      return true;
    })
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({ errors: errors.array() });
};

module.exports = {
  getAllRules,
  getByIdRules,
  validate,
};

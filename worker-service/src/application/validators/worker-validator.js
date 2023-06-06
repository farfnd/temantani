const { body, param, validationResult, query } = require('express-validator');
const WorkAvailability = require('../../domain/enums/WorkAvailability');

const getAllRules = [
  query('filter.workAvailability')
    .optional()
    .isIn(Object.values(WorkAvailability))
    .withMessage('Invalid availability')
];

const getByIdRules = [
  param('id')
    .exists()
    .withMessage('ID is required')
    .isUUID(),

  query('include')
    .optional()
    .custom(value => {
      const includeValues = value.split(',');
      const validValues = ['workOffers', 'workReports', 'projects'];

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

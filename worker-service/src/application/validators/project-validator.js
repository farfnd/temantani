const { body, param, validationResult, query } = require('express-validator');
const ProjectStatus = require('../../domain/enums/ProjectStatus');

const getAllRules = [
  query('filter.landId')
    .optional()
    .isInt()
    .withMessage('Invalid landId'),
  query('filter.status')
    .optional()
    .isIn(Object.values(ProjectStatus))
    .withMessage('Invalid status')
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
      const validValues = [
        'workOffers', 'workOffers.worker', 'workOffers.project',
        'workReports', 'workReports.worker', 'workReports.project',
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

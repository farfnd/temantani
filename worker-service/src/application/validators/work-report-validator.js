const { body, param, validationResult, query } = require('express-validator');
const AcceptableStatus = require('../../domain/enums/AcceptableStatus');
const errors = require('../../support/errors');

const getAllRules = [
  query('filter.projectId').optional().isUUID(),
  query('filter.workerId').optional().isUUID(),
  query('filter.week').optional().isInt({ min: 1 }),
  query('filter.status').optional().isString().custom((value) => {
    if (Object.values(AcceptableStatus).indexOf(value) === -1) {
      throw errors.BadRequest('Invalid status');
    }
    return true;
  }),
  
  query('include')
    .optional()
    .custom(value => {
      const includeValues = value.split(',');
      const validValues = [
        'project', 'worker'
      ];

      for (const includeValue of includeValues) {
        if (!validValues.includes(includeValue)) {
          throw new Error('Invalid include value');
        }
      }

      return true;
    })
];

const createRules = [
  body('projectId').notEmpty().isUUID(),
  body('workerId').not().exists(),
  body('week').notEmpty().isInt({ min: 1 }),
  body('description').notEmpty().isString(),
  body('proof').optional().isString()
];

const updateRules = [
  param('id').notEmpty().isUUID(),
  body('projectId').not().exists().withMessage('Project ID cannot be updated'),
  body('workerId').not().exists().withMessage('Worker ID cannot be updated'),
  body('week').not().exists().withMessage('Week cannot be updated'),

  body('status')
  .custom((value, { req }) => {
    if (req.user.roles.some(role => role.includes('ADMIN'))) {
      if (!value) {
        throw errors.BadRequest('Status is required for admins');
      }
      if (Object.values(AcceptableStatus).indexOf(value) === -1) {
        throw errors.BadRequest('Invalid status');
      }
    } else if (value) {
      throw errors.Forbidden('Only admins can update the status of a work report');
    }
    return true;
  }),

  body('description').custom((value, { req }) => {
    if (req.user.roles.some(role => role.includes('ADMIN')) && value) {
      throw errors.Forbidden('Only workers can update the description of a work report');
    }
    return true;
  }).bail().optional().isString(),

  body('proof').custom((value, { req }) => {
    if (req.user.roles.some(role => role.includes('ADMIN')) && value) {
      throw errors.Forbidden('Only workers can update the proof of a work report');
    }
    return true;
  }).bail().optional().isString()
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
  createRules,
  updateRules,
  validate,
};

const { body, param, validationResult, query } = require('express-validator');
const AcceptableStatus = require('../../domain/enums/AcceptableStatus');

const getAllRules = [
  query('filter.projectId').optional().isUUID(),
  query('filter.workerId').optional().isUUID(),
  query('filter.adminId').not().exists(),
  query('filter.status').optional().isIn(Object.values(AcceptableStatus)),
  query('filter.workContractAccepted').optional().isBoolean(),
];

const createRules = [
  body('projectId').notEmpty().isUUID(),
  body('workerId').notEmpty().isUUID(),
  body('adminId').optional().isUUID(),
  body('status').notEmpty().isIn(Object.values(AcceptableStatus)),
  body('workContractAccepted').optional().isBoolean(),
];

const updateRules = [
  param('id').notEmpty().isUUID(),
  body('projectId').not().exists().withMessage('Project ID cannot be updated'),
  body('workerId').not().exists().withMessage('Worker ID cannot be updated'),
  body('adminId').not().exists().withMessage('Admin ID cannot be updated'),
  body('status').optional().isIn(Object.values(AcceptableStatus)),
  body('workContractAccepted').optional().isBoolean(),
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

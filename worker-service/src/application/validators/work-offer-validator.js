const { body, param, validationResult } = require('express-validator');
const AcceptableStatus = require('../../domain/enums/AcceptableStatus');

const createRules = [
  body('projectId').notEmpty().isUUID(),
  body('workerId').notEmpty().isUUID(),
  body('adminId').notEmpty().isUUID(),
  body('status').notEmpty().isIn(Object.values(AcceptableStatus)),
  body('workContractUrl').optional().isString(),
];

const updateRules = [
  param('id').notEmpty().isUUID(),
  body('projectId').optional().isUUID(),
  body('workerId').optional().isUUID(),
  body('adminId').optional().isUUID(),
  body('status').optional().isIn(Object.values(AcceptableStatus)),
  body('workContractUrl').optional().isString(),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({ errors: errors.array() });
};

module.exports = {
  createRules,
  updateRules,
  validate,
};

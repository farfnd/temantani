const { body, param, validationResult } = require('express-validator');
const AcceptableStatus = require('../../domain/enums/AcceptableStatus');

const createRules = [
  body('projectId').notEmpty().isUUID(),
  body('workerId').notEmpty().isUUID(),
  body('status').notEmpty().isIn(Object.values(AcceptableStatus)),
  body('week').notEmpty().isInt({ min: 1, max: 52 }),
  body('description').notEmpty().isString(),
  body('proof').notEmpty().isString()
];

const updateRules = [
  param('id').notEmpty().isUUID(),
  body('projectId').not().exists().withMessage('Project ID cannot be updated'),
  body('workerId').not().exists().withMessage('Worker ID cannot be updated'),
  body('status').notEmpty().isIn(Object.values(AcceptableStatus)),
  body('week').notEmpty().isInt({ min: 1, max: 52 }),
  body('description').notEmpty().isString(),
  body('proof').notEmpty().isString()
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

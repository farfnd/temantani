const express = require('express');
const authMiddleware = require('../../../application/middleware/auth.js');

const repositories = require("../../../domain/repositories/index.js");
const useCases = require("../../../application/use-cases/index.js");
const controllers = require('../../controllers/index.js');

module.exports = {
  express,
  controllers,
  repositories,
  useCases,
  authMiddleware
};

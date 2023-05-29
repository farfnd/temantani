const express = require('express');
const middlewares = require('../../../application/middleware');

const repositories = require("../../../domain/repositories");
const useCases = require("../../../application/use-cases");
const controllers = require('../../controllers');

module.exports = {
  express,
  controllers,
  repositories,
  useCases,
  middlewares
};

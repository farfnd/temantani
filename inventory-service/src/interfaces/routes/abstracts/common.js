const express = require('express');
const middlewares = require('../../../application/middlewares');

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

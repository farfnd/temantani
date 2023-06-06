const { Router } = require('express');
const EventPublisher = require("../../../infrastructure/event-publisher.js");
const middlewares = require('../../../application/middlewares/index.js');

const adminDependency = require('../../dependencies/admin-dependency.js');
const workerDependency = require('../../dependencies/worker-dependency.js');
const workOfferDependency = require('../../dependencies/work-offer-dependency.js');
const workReportDependency = require('../../dependencies/work-report-dependency.js');
const projectDependency = require('../../dependencies/project-dependency.js');

const controllers = {
  adminController: adminDependency(),
  workerController: workerDependency(),
  workOfferController: workOfferDependency(),
  workReportController: workReportDependency(),
  projectController: projectDependency(),
}

module.exports = {
  Router,
  controllers,
  middlewares
};

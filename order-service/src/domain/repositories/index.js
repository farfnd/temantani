'use strict';

const fs = require('fs');
const path = require('path');
const { startCase, replace } = require('lodash');
const basename = path.basename(__filename);
const files = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        const name = replace(startCase(file.slice(0, -3)), /\s/g, '');
        const middleware = require(path.join(__dirname, file));
        files[name] = middleware;
    });

module.exports = files;

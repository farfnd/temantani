'use strict';

const fs = require('fs');
const path = require('path');
const { camelCase } = require('lodash');
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
        const name = camelCase(file.split('.')[0]); // Convert filename to camelCase
        const controller = require(path.join(__dirname, file));
        files[name] = controller;
    });

module.exports = files;

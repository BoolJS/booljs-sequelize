'use strict';

const { DatabaseModel } = require('@booljs/api');

module.exports = class SequelizeModel extends DatabaseModel {
    constructor (schema) {
        super();
        this.__schema = schema;
    }
};

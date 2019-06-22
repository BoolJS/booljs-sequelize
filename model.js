'use strict';

const { DatabaseModel } = require('@booljs/api');

const Schema = Symbol('schema');

module.exports = class SequelizeModel extends DatabaseModel {
    static get Schema () {
        return Schema;
    }

    constructor (schema) {
        super();
        this[Schema] = schema;
    }
};

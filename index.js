'use strict';

const Sequelize = require('sequelize');
const MySQLModel = require('./model');
const { Schema } = MySQLModel;

const { DatabaseLoader } = require('@booljs/api');
const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = class BoolJSMySQL extends DatabaseLoader {
    constructor ({ connectionSettingsStoreName = 'sequelize' } = {}) {
        super('booljs.sequelize', connectionSettingsStoreName);
    }

    async openDatabase (configuration = {}) {
        const settings = configuration[process.env.NODE_ENV || 'development'] || {};
        const {
            dialect: configDialect,
            host: configHost,
            database: configDatabase,
            username: configUsername,
            password: configPassword,
            ...options
        } = settings;

        const {
            BOOLJS_SEQUELIZE__DIALECT: envDialect,
            BOOLJS_SEQUELIZE__HOST: envHost,
            BOOLJS_SEQUELIZE__DATABASE: envDatabase,
            BOOLJS_SEQUELIZE__USERNAME: envUsername,
            BOOLJS_SEQUELIZE__PASSWORD: envPassword
        } = process.env;

        const dialect = configDialect || envDialect;
        const host = configHost || envHost;
        const database = configDatabase || envDatabase;
        const username = configUsername || envUsername;
        const password = configPassword || envPassword;

        const connection =
            new Sequelize(database, username, password, { dialect, host, ...options });
        await connection.authenticate();

        this.connection = connection;
        this.models = {};
        this.__associations = [];
        return connection;
    };

    async fetchModels (instance, name, Component, connection) {
        const app = instance.getComponents();
        const { models } = this;

        const args = [ null, app, { connection, Sequelize, models } ];

        const SchemaClass = Function.prototype.bind.apply(Component, args);

        const {
            [Schema]: schema,
            ...instanceProps
        } = new SchemaClass();

        Object.assign(schema.prototype, instanceProps);
        models[name] = schema;

        if (Component.associations !== undefined &&
            typeof Component.associations === 'function') {
            this.__associations.push(Component.associations);
        }

        const readOnly = [ 'constructor', 'name', 'length', 'prototype' ];

        const staticsKeys = Object
            .getOwnPropertyNames(Component)
            .filter(key => Component[key] !== Component.associations &&
                !readOnly.includes(key));

        for (let key of staticsKeys) {
            schema[key] = function (...args) {
                return Component[key].apply(this, args);
            };
        }

        const methodsKeys = Object
            .getOwnPropertyNames(Component.prototype)
            .filter(key => typeof Component.prototype[key] === 'function' &&
                !readOnly.includes(key));

        for (let key of methodsKeys) {
            schema.prototype[key] = function (...args) {
                return Component.prototype[key].apply(this, args);
            };
        }

        return schema;
    }

    async afterFetch () {
        for (let associationFunction of this.__associations) {
            await associationFunction(this.models);
        }
    }

    modelClass () {
        return MySQLModel;
    }

    modelTemplate () {
        return readFileSync(join(require.resolve('.'), 'templates/model.js'));
    }

    modelConfiguration () {
        return readFileSync(
            join(require.resolve('.'), 'templates/configuration.json'));
    }
};

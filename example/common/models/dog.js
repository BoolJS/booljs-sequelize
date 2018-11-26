'use strict';

const SequelizeModel = require('../../../model');

module.exports = class DogModel extends SequelizeModel {
    constructor (app, { connection, Sequelize }) {
        const dogSchema = connection.define('dog', {
            name: Sequelize.STRING,
            color: Sequelize.STRING
        });

        super(dogSchema);
    }
};

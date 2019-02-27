'use strict';

const Bool = require('booljs');

describe('SQLite (via env variables)', function () {
    let model;
    process.env.BOOLJS_SEQUELIZE__DIALECT = 'sqlite';

    describe('Model', () => {
        before(async () => {
            const { app } = await new Bool('com.example.sqlite.env', [
                require.resolve('..')
            ]).setBase('example/sqlite.env')
                .setDatabaseDrivers('booljs.sequelize')
                .run();

            model = app.models.Dog;
            await model.sync();
        });

        it('#insert', () => expect(model.create({
            name: 'Fido',
            color: 'Green'
        })).to.eventually.be.fulfilled);

        it('#findAll', () => expect(model.findAll())
            .to.eventually.have.length(1));
    });
});

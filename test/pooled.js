'use strict';

const Bool = require('booljs');

describe('Pooled connection', function () {
    let model;

    describe('Model', () => {
        before(async () => {
            const { app } = await new Bool('com.example.pooled', [
                require.resolve('..')
            ]).setBase('example/pooled')
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

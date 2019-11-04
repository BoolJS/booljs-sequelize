<p align="center"><img src="https://cdn.rawgit.com/BoolJS/booljs/master/logo.svg" width="50%"></p>

<p align="center">
    <a href="https://travis-ci.org/BoolJS/booljs-sequelize"><img src="https://img.shields.io/travis/BoolJS/booljs-sequelize.svg?style=flat-square" alt="Build Status"></a>
    <a href="LICENSE.md"><img src="https://img.shields.io/badge/License-GPL%20v3-green.svg?style=flat-square" alt="License"></a>
    <a href="https://github.com/BoolJS/booljs-sequelize/releases"><img src="https://img.shields.io/github/release/BoolJS/booljs-sequelize.svg?style=flat-square" alt="Latest Stable Version"></a>
    <a href="https://david-dm.org/booljs/booljs-sequelize"><img src="https://img.shields.io/david/booljs/booljs-sequelize.svg?style=flat-square" alt="Dependency status"></a>
    <a href="https://david-dm.org/booljs/booljs-sequelize?type=dev"><img src="https://img.shields.io/david/dev/booljs/booljs-sequelize.svg?style=flat-square" alt="devDependency status"></a>
    <a href="https://david-dm.org/booljs/booljs-sequelize?type=peer"><img src="https://img.shields.io/david/peer/booljs/booljs-sequelize.svg?style=flat-square" alt="peerDependency status"></a>
    <a href="https://codeclimate.com/github/BoolJS/booljs-sequelize/maintainability"><img src="https://api.codeclimate.com/v1/badges/102e5750974935be2b3b/maintainability" /></a>
    <a href="https://codecov.io/gh/BoolJS/booljs"><img src="https://img.shields.io/codecov/c/github/booljs/booljs-sequelize.svg?style=flat-square" alt="Code Coverage"></a>
    <a href="http://inch-ci.org/github/booljs/booljs-sequelize"><img src="http://inch-ci.org/github/booljs/booljs-sequelize.svg?branch=master" alt="Inline docs"></a>
    <a href="https://gitter.im/BoolJS/booljs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://img.shields.io/gitter/room/booljs/booljs-sequelize.svg?style=flat-square" alt="Join the chat at https://gitter.im/BoolJS/booljs-sequelize"></a>
</p>

<p align="center">
    <a href="https://npmjs.com/packages/@booljs/sequelize"><img src="https://nodei.co/npm/@booljs/sequelize.png" alt="NPM icon"></a>
</p>

`@booljs/sequelize` is a database loader intended to enable developers to use Sequelize in the [BoolJS Framework](http://bool.js.org/).

## Install

Install the package using

```
npm install @booljs/sequelize
```

BoolJS Sequelize uses some peerDependencies you must have in your project. We encourage using `npm 6+` in all your projects, because is strict in making you declare them in your project.

```
npm install sequelize@latest
```

Finally, you might need to get some documentation on the usage of Sequelize. Find it on [their](http://www.sequelize.org) website.


## Usage

First, register the `@booljs/sequelize` module in your BoolJS application. Then, add it to the [database drivers](https://)

In `index.js`, declare:

```js
const Bool = require('booljs');

async function main () {
    const API = new Bool('com.example.api', [ '@booljs/sequelize' ]);
        .setDatabaseDrivers('booljs.sequelize');

    return API.run();
}

module.exports = main();
```

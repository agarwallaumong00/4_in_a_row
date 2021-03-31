'use strict';

module.exports = angular.module('myApp.main', [])
    .config(require('./route'))
    .component('catalogContainer', require('./catalog'))
    .component('card', require('./card'));
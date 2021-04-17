'use strict';

module.exports = angular.module('myApp.main', [])
    .config(require('./route'))
    .component('mainContainer', require('./container'))
    .component('intro', require('./intro'))
    .component('gameOptions', require('./game-options'))
    .component('userTile', require('./user-tile'))
    .component('selectionModal', require('./selection-modal'))
    .component('gameComponent', require('./game'));
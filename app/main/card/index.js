'use strict';

var cardComponent = {
    template: require('./card.html'),
    controller: require('./card.controller'),
    bindings: {
        value: '<',
        suit: '<'
    }
};

module.exports = cardComponent;
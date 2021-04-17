'use strict';

const headerComponent = {
    template: require('./header.html'),
    controller: require('./header.controller'),
    bindings: {
        goBack: '&'
    }
};

module.exports = headerComponent;
'use strict';

const selectionModalComponent = {
    template: require('./selection-modal.html'),
    controller: require('./selection-modal.controller.js'),
    bindings: {
        data: '<',
        modelBinder: '=',
        close: '&',
        save: '&'
    }
};

module.exports = selectionModalComponent;
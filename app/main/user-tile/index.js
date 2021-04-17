'use strict';

const userTitleComponent = {
    template: require('./user-tile.html'),
    controller: require('./user-tile.controller.js'),
    bindings: {
        title: '<',
        profile: '<',
        colorCode: '<',
        borderColorCode: '<',
        placeholderText: '<',
        payload: '=',
        modelBind: '=',
        openModal: '&',
        isGamePanel: '<',
        isActive: '<',
        showOnlyIcon: '<',
        score: '<'
    }
};

module.exports = userTitleComponent;
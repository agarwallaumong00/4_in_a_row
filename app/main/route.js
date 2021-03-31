'use strict';

function catalogRoute($stateProvider) {
    $stateProvider.state('catalog', {
        parent: 'home',
        url: '/catalog',
        views: {
            'main@': {
                component: 'catalogContainer'
            }
        }
    });
}

catalogRoute.$inject = ['$stateProvider'];

module.exports = catalogRoute;

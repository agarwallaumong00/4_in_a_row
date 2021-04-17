'use strict';

function mainRoute($stateProvider) {
    $stateProvider.state('main', {
        parent: 'home',
        url: '/main',
        views: {
            'main@': {
                component: 'mainContainer'
            }
        }
    });

    $stateProvider.state('options', {
        parent: 'main',
        url: '/options',
        views: {
            'main@': {
                component: 'gameOptions'
            }
        },
        params: {
            payload: null
        }
    });

    $stateProvider.state('game', {
        parent: 'main',
        url: '/game',
        views: {
            'main@': {
                component: 'gameComponent'
            }
        },
        params: {
            payload: null
        }
    });
}

mainRoute.$inject = ['$stateProvider'];

module.exports = mainRoute;

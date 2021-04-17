'use strict';

function routeConfig($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('home', {
        url: ''
    });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise(wrongRouteHandler);
}

routeConfig.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider'];

function wrongRouteHandler($injector) {
    var state = $injector.get('$state');
    state.go('main');
}

wrongRouteHandler.$inject = ['($injector'];

module.exports = routeConfig;
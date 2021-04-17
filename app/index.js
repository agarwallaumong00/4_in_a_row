'use strict';

require('angular');
require('angular-material');
require('@uirouter/angularjs');

require('./index.scss');
require('./shared');
require('./main');


angular.module('myApp', [
    'ngMaterial',
    'ui.router',
    'myApp.shared',
    'myApp.main'
])
.config(require('./index.route'));
'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [
        {'title': 'Pages',              'link': 'pages'},
        {'title': 'New Page',           'link': 'pages/create'},
        {'title': 'Routes',             'link': 'routes'},
    ];

    $scope.isCollapsed = false;
}]);
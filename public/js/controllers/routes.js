'use strict';

angular.module('mean.routes').controller('RoutesController', ['$scope', '$routeParams', '$location', 'Global', 'Routes', function ($scope, $routeParams, $location, Global, Routes) {
    $scope.global = Global;

    $scope.create = function() {
        var model = new Routes({
            action: 	this.action,
            controller: this.controller,
            path: 		this.path,
            verb:       this.verb
        });

        console.log(model);

        model.$save(function(response) {
            $location.path('routes');
        });

        this.action     = '';
        this.controller = '';
        this.path       = '';
        this.verb       = '';
    };

    $scope.find = function() {
        Routes.query(function(routes) {
            $scope.routes = routes;
        });
    };

}]);
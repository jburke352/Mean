'use strict';

angular.module('mean.routes').controller('RoutesController', ['$scope', '$routeParams', '$location', 'Global', 'Routes', function ($scope, $routeParams, $location, Global, Routes) {
    $scope.global = Global;

    $scope.create = function() {
        var model = new Routes({
            action:     this.action,
            controller: this.controller,
            path:       this.path,
            verb:       this.verb
        });

        model.$save(function() {
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

    $scope.findOne = function() {
        Routes.get({routeId: $routeParams.routeId}, function(route) {
            $scope.route = route;
        });
    };

    $scope.remove = function(route) {
        if (route) {
            route.$remove();

            for (var i in $scope.routes) {
                if ($scope.routes[i] === route) {
                    $scope.routes.splice(i, 1);
                }
            }
        }
        else {
            $scope.route.$remove();
            $location.path('routes');
        }
    };

    $scope.update = function() {
        var model = $scope.route;
        if (!model.updated) {
            model.updated = [];
        }
        model.updated.push(new Date().getTime());

        model.$update(function() {
            $location.path('routes/' + model._id);
        });
    };

}]);
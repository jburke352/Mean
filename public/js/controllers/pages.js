'use strict';

angular.module('mean.pages').controller('PagesController', ['$scope', '$routeParams', '$location', 'Global', 'Pages', function ($scope, $routeParams, $location, Global, Pages) {
    $scope.global = Global;

    $scope.create = function() {
        var model = new Pages({        
            title: this.title,
            route: this.route
        });

        model.$save(function(response) {
            $location.path('pages');
        });

        this.title     = '';
        this.route     = '';
    };

    $scope.find = function() {
        Pages.query(function(pages) {
            $scope.pages = pages;
        });
    };

}]);
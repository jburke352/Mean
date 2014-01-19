'use strict';

angular.module('mean.pages').controller('PagesController', ['$scope', '$routeParams', '$location', 'Global', 'Pages', function ($scope, $routeParams, $location, Global, Pages) {
    $scope.global = Global;

    $scope.create = function() {
        var model = new Pages({
            title:      this.title,
            route:      this.route,
            content:    this.content
        });

        model.$save(function() {
            $location.path('pages');
        });

        this.title     = '';
        this.route     = '';
        this.content   = '';
    };

    $scope.find = function() {
        Pages.query(function(pages) {
            $scope.pages = pages;
        });
    };

    $scope.findOne = function() {
        Pages.get({pageId: $routeParams.pageId}, function(page) {
            $scope.page = page;
        });
    };

    $scope.remove = function(page) {
        if (page) {
            page.$remove();

            for (var i in $scope.pages) {
                if ($scope.pages[i] === page) {
                    $scope.pages.splice(i, 1);
                }
            }
        }
        else {
            $scope.page.$remove();
            $location.path('pagess');
        }
    };

    $scope.update = function() {
        var model = $scope.page;
        if (!model.updated) {
            model.updated = [];
        }
        model.updated.push(new Date().getTime());

        model.$update(function() {
            $location.path('pages/' + model._id);
        });
    };

}]);
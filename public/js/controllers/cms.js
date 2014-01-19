'use strict';

angular.module('mean.cms').controller('CMSController', ['$scope', '$routeParams', '$location', 'Global', 'CMSService' function ($scope, $routeParams, $location, Global, CMSService) {
    $scope.global = Global;

    $scope.getPage = function() {
        CMSService.get({path: $routeParams.path}, function(page){
            $scope.page = page;
        })
    };
    $scope.updatePage = function() {
        var page = $scope.page;
        if(!page.updated) {
            page.updated = [];
        }
        page.updated.push(new Date().getTime());

        page.$update(function() {
            $location.path('' + page.path);
        })
    }
    /*$scope.deletePage = function(page) {
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
            $location.path('pages');
        }
    };
    $scope.allPages = function() {
        CMSService.query(function(pages) {
            $scope.pages = pages;
        });
    };*/
}]);
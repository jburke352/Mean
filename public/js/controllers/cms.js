'use strict';

angular.module('mean.cms').controller('CMSController', ['$scope', '$routeParams', '$location', 'Global', 'Cms', function ($scope, $routeParams, $location, Global, Cms) {
    $scope.global = Global;

    $scope.getPage = function() {
        Cms.get({path: $routeParams.path}, function(page){
            $scope.page         = page;
            $scope.template     = 'views/cms/home-template.html';
        })
    };
    $scope.updatePage = function() {
        var page = $scope.page;
        //if(!page.updated) {
        //    page.updated = [];
        //}
        //page.updated.push(new Date().getTime());
        //alert(page.route);
        page.$update({path: $routeParams.path}, function() {
            //alert(page.route);
            Notes.update({ id:$id }, note);
            $location.path(page.route);
        })
    };
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
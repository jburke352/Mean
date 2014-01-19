'use strict';

angular.module('mean.cms').controller('CMSController', ['$scope', '$routeParams', '$location', 'Global', function ($scope, $routeParams, $location, Global) {
    $scope.global = Global;

    $scope.getContent = function() {
        //$scope.pages = pages;
        $scope.page = $routeParams.pageName;
        if($scope.page == 'inner') {
            $scope.template = 'views/cms/inner-template.html';
            $scope.Title = 'Inner Page';
        } else if ($scope.page == 'home') {
            $scope.template = 'views/cms/home-template.html';
            $scope.Title = 'Home Page';
        }
    };
}]);
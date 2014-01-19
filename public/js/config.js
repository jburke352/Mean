'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles',                   { templateUrl: 'views/articles/list.html' }).
        when('/articles/create',            { templateUrl: 'views/articles/create.html' }).
        when('/articles/:articleId/edit',   { templateUrl: 'views/articles/edit.html' }).
        when('/articles/:articleId',        { templateUrl: 'views/articles/view.html' }).
        when('/pages/create',               { templateUrl: 'views/pages/create.html' }).
        when('/pages',                      { templateUrl: 'views/pages/list.html' }).
        when('/routes/create',              { templateUrl: 'views/routes/create.html' }).
        when('/routes/:routeId/edit',       { templateUrl: 'views/routes/edit.html' }).
        when('/routes',                     { templateUrl: 'views/routes/list.html' }).
        when('/:pageName',                   { templateUrl: 'views/cms/page.html' }).
        when('/',                           { templateUrl: 'views/index.html' }).
        otherwise({ redirectTo: '/'});
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
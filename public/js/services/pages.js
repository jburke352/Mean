'use strict';

//Routes service used for articles REST endpoint
angular.module('mean.pages').factory('Pages', ['$resource', function($resource) {
    return $resource('pages/:pagesId', {
        pageId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
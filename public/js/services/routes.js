'use strict';

//Routes service used for articles REST endpoint
angular.module('mean.routes').factory('Routes', ['$resource', function($resource) {
    return $resource('routes/:routeId', {
        routeId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
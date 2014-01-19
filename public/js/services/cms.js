'use strict';

//Articles service used for articles REST endpoint
angular
.module('mean.cms')
.factory('CMSService', ['$resource', function($resource) {
    return $resource(':path', {
        path 		: '@_path'
    }, {
        update: {	
            method		: 'PUT'
        }
    });
}]);
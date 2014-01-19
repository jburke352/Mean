'use strict';

//Articles service used for articles REST endpoint
angular
.module('mean.cms')
.factory('Cms', ['$resource', function($resource) {
	
    return $resource(':path', { path: '@path'}, { update: {	method: 'PUT'}});
}]);
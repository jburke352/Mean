'use strict';

angular.module('mean', [
	'ngCookies', 
	'ngResource', 
	'ngRoute', 
	'ui.bootstrap', 
	'ui.route', 
	'mean.system', 
	'mean.articles',
	'mean.routes'
]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.routes', []);
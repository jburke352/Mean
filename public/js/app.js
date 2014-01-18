'use strict';

angular.module('mean', [
	'ngCookies', 
	'ngResource', 
	'ngRoute', 
	'ui.bootstrap', 
	'ui.route', 
	'mean.system', 
	'mean.articles',
	'mean.routes',
	'mean.pages',
]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.pages', []);
angular.module('mean.routes', []);
'use strict';

angular.module('mean', [
	'ngCookies', 
	'ngResource', 
	'ngRoute', 
	'ngSanitize',
	'ngCkeditor',
	'ui.bootstrap', 
	'ui.route', 
	'mean.system', 
	'mean.articles',
	'mean.routes',
	'mean.pages',
	'mean.cms'
]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.pages', []);
angular.module('mean.routes', []);
angular.module('mean.cms', []);

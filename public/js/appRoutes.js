angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'views/Words.html',
			controller: 'WordsController'
		})

		.when('/dics', {
			templateUrl: 'views/dics.html',
			controller: 'DicController'	
		})
		
		.otherwise('/');

	$locationProvider.html5Mode(true);

}]);
'use strict';

let SpinTracker = angular.module("SpinTracker", ["ngRoute", "angularMoment", "ngSanitize"])
	.constant('FirebaseUrl', 'https://spintrack-faa88.firebaseio.com/');

let isAuth = (UserFactory) => {
	return new Promise((resolve, reject) => {
		UserFactory.isAuthenticated()
			.then((userExistence) => {
				if (userExistence) {
					resolve();
				} else {
					reject();
				}
			});
	});
};

SpinTracker.config(($routeProvider) => {
	$routeProvider
		.when('/news', {
			templateUrl: 'templates/article_grid.html',
			controller: 'ArticleGridViewController',
			resolve: { isAuth }
		})
		.when('/', {
			templateUrl: 'templates/login.html',
			controller: 'LoginController'
		})
		.otherwise('/');
});

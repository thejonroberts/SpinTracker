'use strict';

let SpinTracker = angular.module("SpinTracker", ["ngRoute"])
.constant('FirebaseUrl', 'https://spintrack-faa88.firebaseio.com/');

SpinTracker.config( ($routeProvider) => {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/article_grid.html',
        controller: 'ArticleGridViewController'
        resolve: {isAuth}
    })
    .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    })
    .otherwise('/login');
});

'use strict';

console.log('hello News');

let SpinTracker = angular.module("SpinTracker", ["ngRoute"])
.constant('FirebaseUrl', 'https://spintrack-faa88.firebaseio.com/');

SpinTracker.config( ($routeProvider) => {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/article_grid.html',
        controller: 'ArticleGridViewController'
    })
    .otherwise('/');
});

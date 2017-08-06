'use strict';

console.log('hello News');

let SpinTracker = angular.module("SpinTracker", ["ngRoute"])
.constant('FirebaseUrl', 'https://spintrack-faa88.firebaseio.com/');

// SpinTracker.config(($routeProvider)=>{
//     $routeProvider
//     .when('/', {
//         templateUrl: 'templates/login.html',
//         controller: 'UserController'
//     })
    // .when('/board/all', {
    //     templateUrl: 'templates/boards-all.html',
    //     controller: 'AllBoardsController',
    //     // resolve: {isAuth}
    // // })
    // .when('/board/:board_id', {
    //     templateUrl : 'templates/single-board.html',
    //     controller: 'SingleBoardController',
    //     resolve: {isAuth}
    // })
    // .when('/pin/add', {
    //     templateUrl: 'templates/pin-form.html',
    //     controller: 'AddPinController',
    //     resolve: {isAuth}
    // })
    // .when('/pin/add/:board_id', {
    //     templateUrl: 'templates/pin-form.html',
    //     controller: 'AddPinController',
    //     resolve: {isAuth}
    // })
    // .when('/pin/view/:pin_id', {
    //     templateUrl: 'templates/single-pin.html',
    //     controller: 'SinglePinController',
    //     resolve: {isAuth}
    // })
    // .when('/pin/edit/:pin_id', {
    //     templateUrl: 'templates/pin-form.html',
    //     controller: 'EditPinController',
    //     resolve: {isAuth}
    // })
//     .otherwise('/');
// });

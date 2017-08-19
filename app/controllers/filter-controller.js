'use strict';

SpinTracker.controller("FilterController", function($q, $http, $scope, FilterFactory, FirebaseUrl, UserFactory) {

	$scope.filter = FilterFactory;

	$scope.saveSources = () => {
		console.log('$scope.filter.userSourceArr', $scope.filter.userSourceArr);
		UserFactory.updateUserInfo($scope.filter.userSourceArr);
	};

});

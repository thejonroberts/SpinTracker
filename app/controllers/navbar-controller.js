'use strict';

SpinTracker.controller("NavbarController", function($scope, $q, $http, FirebaseUrl, FilterFactory) {

	$scope.search = FilterFactory;

	$scope.clearSearch = () => {
		$scope.search.searchTerm = "";
	};

});

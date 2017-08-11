'use strict';

SpinTracker.controller("NavbarController", function($scope, $q, $http, $window, FirebaseUrl, UserFactory, FilterFactory) {

	$scope.search = FilterFactory;

	$scope.clearSearch = () => {
		$scope.search.searchTerm = "";
	};

	$scope.logout = () => {
        UserFactory.logoutUser()
        .then( (data) => {
            $window.location.href = "#!/";
            // alert('successfully logged out');
        });
    };

});

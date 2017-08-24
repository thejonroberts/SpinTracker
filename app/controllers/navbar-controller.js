'use strict';

SpinTracker.controller("NavbarController", function ($scope, $window, UserFactory, FilterFactory) {

	$scope.search = FilterFactory;

	$scope.clearSearch = () => {
		$scope.search.searchTerm = "";
	};

	$scope.logout = () => {
		UserFactory.logoutUser()
			.then(() => {
				$window.location.href = "#!/";
			});
	};

});

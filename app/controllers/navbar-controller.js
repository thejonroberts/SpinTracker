'use strict';

SpinTracker.controller("NavbarController", function ($scope, $window, UserFactory, FilterFactory, ArticleFactory) {

	$scope.search = FilterFactory;

	$scope.clearSearch = () => {
		$scope.search.searchTerm = "";
	};

	$scope.logout = () => {
		UserFactory.logoutUser()
			.then((data) => {
				$window.location.href = "#!/";
			});
	};

});

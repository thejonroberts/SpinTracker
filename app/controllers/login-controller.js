'use strict';

SpinTracker.controller("LoginController", function($q, $http, $scope, FirebaseUrl) {

	$scope.login = () => {
        UserFactory.loginUser()
        .then( (data) => {
            let currentUser = data.user.uid;
            $window.location.href = '#!/board/all';
        });
    };

});

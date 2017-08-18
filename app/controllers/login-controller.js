'use strict';

SpinTracker.controller("LoginController", function($q, $http, $scope, $window, FirebaseUrl, UserFactory) {

	$scope.login = () => {
    UserFactory.loginUser()
    .then( (data) => {
    	// console.log('data', data);
    	// data.user.uid
    	UserFactory.getUserInfo()
    	.then( (userFBata) => {
    		// console.log('userFBata', userFBata);
    		let key = Object.keys(userFBata.data)[0];
    		// console.log('key', key);
    		if ( !key ) {
      		let user = UserFactory.getUser();
      		let userObject = {
      			uid: `${user}`,
      			userSources: {}
    			};
      		UserFactory.createUserInfo(userObject)
      		.then( (data) => {
      			// console.log('user created', data);
	          $window.location.href = '#!/news';
      		});
    		} else {
          $window.location.href = '#!/news';
    		}
  		})
  		.catch( (err) => {
  			console.log('error creating user', err);
    	});
  	})
  	.catch( (err) => {
  		console.log('error getting user', err);
  	});
  };

});

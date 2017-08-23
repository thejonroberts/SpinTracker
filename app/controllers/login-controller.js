'use strict';

SpinTracker.controller("LoginController", function ($q, $http, $scope, $window, FirebaseUrl, UserFactory, FilterFactory, ArticleFactory) {

	let filter = FilterFactory;

	//run on login button click
	$scope.login = () => {
		UserFactory.loginUser()
			.then((data) => {
				// get FB info for user
				UserFactory.getUserInfo()
					.then((userFBData) => {
						// grab key for user FB object
						let key = Object.keys(userFBData.data)[0];
						// if key does not exist, no user info; create new user FB entry
						if (!key) {
							let user = UserFactory.getUser();
							let userObject = {
								uid: `${user}`,
								userSources: []
							};
							ArticleFactory.getAllSources()
								.then((sourceData) => {
									//user default view for source is true, set default prefs.
									for (let source in sourceData) {
										userObject.userSources.push(true);
										filter.userSourceArr.push(true);
									}
									UserFactory.createUserInfo(userObject)
										.then((data) => {
											UserFactory.setUserKey(data.name);
											// once user is created, go to news list
											$window.location.href = '#!/news';
										})
										.catch((err) => {
											console.log('error creating User', err);
										});
								})
								.catch((err) => {
									console.log('err getting sources in user creation', err);
								});
						} else {
							UserFactory.setUserKey(key);
							filter.userSourceArr = userFBData.data[key].userSources;
							$window.location.href = '#!/news';
						}
					})
					.catch((err) => {
						console.log('error creating user', err);
					});
			})
			.catch((err) => {
				console.log('error getting user', err);
			});
	};

});

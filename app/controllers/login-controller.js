'use strict';

SpinTracker.controller("LoginController", function ($q, $http, $scope, $window, UserFactory, FilterFactory, ArticleFactory) {

	let filter = FilterFactory;

	let createNewFbUser = (uid) => {
		// let userObject = {
		// 	uid: `${uid}`,
		// 	userSources: []
		// };
		let userSources = [];
		//set all sources to true for new user (in FB and FilterFactory)
		ArticleFactory.getAllSources()
			.then((sourceData) => {
				Object.keys(sourceData).forEach(() => {
					userSources.push(true);
					filter.userSourceArr.push(true);
				});
				UserFactory.createUserInfo({ uid, userSources })
					.then((data) => {
						// once user is created, store key and go to news list
						UserFactory.setUserKey(data.name);
						$window.location.href = '#!/news';
					})
					.catch((err) => {
						console.log('error creating User', err);
					});
			})
			.catch((err) => {
				console.log('err getting sources in user creation', err);
			});
	};

	let getUserFbInfo = (key, userFBData) => {
		//user exists - set FB key, user sources, and then go to news view
		UserFactory.setUserKey(key);
		filter.userSourceArr = userFBData.data[key].userSources;
		$window.location.href = '#!/news';
		//TODO set any new sources to TRUE if they do not exist in FB user source array
	};

	//run on login button click
	$scope.login = () => {
		UserFactory.loginUser()
			.then(() => {
				// get FB info for user
				UserFactory.getUserInfo()
					.then((userFBData) => {
						// grab key for user FB object
						let key = Object.keys(userFBData.data)[0];
						if (!key) {
							// if key does not exist, no user info; create new user FB entry
							createNewFbUser(UserFactory.getUser());
						} else {
							getUserFbInfo(key, userFBData);
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

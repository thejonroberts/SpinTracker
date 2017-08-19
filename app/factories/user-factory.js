'use strict';

SpinTracker.factory("UserFactory", function($q, $http, FirebaseUrl, fbCreds) {

var config = {
		apiKey: fbCreds.apiKey,
		authDomain: fbCreds.authDomain
	};

	firebase.initializeApp(config);
	var provider = new firebase.auth.GoogleAuthProvider();

	let currentUser = null;
	// let userPreferences = FilterFactory.userSourceArr;
	// let userObject = {
	// 	uid: currentUser,
	// };

	let isAuthenticated = () => {
		return $q( (resolve, reject) => {
			firebase.auth().onAuthStateChanged( (user) => {
				if(user) {
					currentUser = user.uid;
					resolve(true);
				}
				else { //on logout we need to set it back to null.
					currentUser = null;
					resolve(false);
				}
			});
		});
	};

	let loginUser = () => {
		return $q( (resolve, reject) => {
			firebase.auth().signInWithPopup( provider)
			.then( (data) => {
				currentUser = data.user.uid;
				// console.log("currentUser", currentUser);
				resolve(data);
		  })
		  .catch( (err) => {
				console.log("error loggin in", err.message);
		  });
		});
  };
	// console.log("currentUser", currentUser);

	let getUser = () => {
		// console.log("currentUser", currentUser);
		return currentUser;
	};

	let getUserInfo = () => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}user.json?orderBy="uid"&equalTo="${currentUser}"`)
      .then( (userData) => {
      	// let userKey = Obj;
      	console.log('userData', userData);
        resolve(userData);
      })
      .catch( (err) => {
        console.log("error getting user info", err);
        reject(err);
	  	});
	  });
	};

  let createUserInfo = (userObject) => {
  	return $q( (resolve, reject) => {
  		let JsonUserObject = angular.toJson(userObject);
  		$http.post(`${FirebaseUrl}user.json`, JsonUserObject)
      .then( (userData) => {
      	console.log('userData', userData);
        resolve(userData);
      })
      .catch( (err) => {
        console.log("error getting user info", err);
        reject(err);
	  	});
	  });
	};

  let updateUserInfo = (userSourceArr) => {
  	return $q( (resolve, reject) => {
  		let userKey = getUser();
  		let JsonUserSources = angular.toJson( {userSources: userSourceArr} );
  		$http.patch(`${FirebaseUrl}user/${userKey}`, JsonUserSources)
      .then( (userData) => {
      	console.log('userData', userData);
        resolve(userData);
      })
      .catch( (err) => {
        console.log("error getting user info", err);
        reject(err);
	  	});
	  });
	};

	let logoutUser = () => {
		return firebase.auth().signOut()
		.catch( (err) => {
			console.log("Error logging out", err.message);
		});
	};

	return {loginUser, isAuthenticated, getUser, logoutUser, getUserInfo, createUserInfo};

});

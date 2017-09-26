'use strict';

SpinTracker.factory('ArticleFactory', function($q, $http, FirebaseUrl) {
	//get all articles in FB to display in grid controller
	let getAllArticles = () => {
		return $q((resolve, reject) => {
			$http
				.get(`${FirebaseUrl}articles.json`)
				.then(articleData => {
					resolve(articleData.data);
				})
				.catch(err => {
					reject(err);
				});
		});
	};

	let getAllSources = () => {
		return $q((resolve, reject) => {
			$http
				.get(`${FirebaseUrl}/sources.json`)
				.then(sourceInfo => {
					resolve(sourceInfo.data);
				})
				.catch(err => {
					console.log('err grabbing source from FB', err);
					reject(err);
				});
		});
	};

	return { getAllArticles, getAllSources };
});

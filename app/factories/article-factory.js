'use strict';

SpinTracker.factory("ArticleFactory", function($q, $http, FirebaseUrl) {

	//get all articles in FB to display in grid controller
	let getAllArticles = () => {
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}articles.json`)
			.then( (articleData) => {
				console.log('articleData', articleData);
				resolve(articleData.data);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};

	return { getAllArticles };
});

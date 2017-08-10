'use strict';

SpinTracker.controller("ArticleGridViewController", function( $scope, ArticleFactory ) {

	ArticleFactory.getAllArticles()
  .then( (articleData)  => {
	let articleArr = [];
	Object.keys(articleData).forEach( (key) => {
		articleData[key].id= key;
		articleArr.push(articleData[key]);
	});
	$scope.articles = articleArr;
  })
  .catch( (err) => {
    console.log('error?', err);
  });

	return {};
});

'use strict';

SpinTracker.controller("ArticleGridViewController", function( $scope, $routeParams, ArticleFactory ) {

	ArticleFactory.getAllArticles()
  .then( (articleData)  => {
	let articleArr = [];
	Object.keys(articleData).forEach( (key) => {
		articleData[key].id= key;
		articleArr.push(articleData[key]);
	});
	//assign all articles to scope.articles
	$scope.articles = articleArr;
	//get all sources
	ArticleFactory.getAllSources()
  .then( (sourceData) => {
  	let sourceArr = [];
		Object.keys(sourceData).forEach( (key) => {
			sourceData[key].id= key;
			sourceArr.push(sourceData[key]);
		});
  	//compare assign relevant source info to each article for filtering
  	$scope.articles.forEach( (article) => {
  		// console.log('checking for source info', article);
  		sourceArr.forEach ( (source) => {
  			if (article.source === source.source_id) {
  				console.log('match', source.name);
  				article.bias = source.bias;
  				article.logoURL = source.logoURL;
  				article.sourceName = source.name;
  			}
  		});
  	});
  })
  .catch( (err) => {
    console.log('error?', err);
  });
});
});

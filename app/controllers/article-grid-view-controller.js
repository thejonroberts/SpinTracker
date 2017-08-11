'use strict';

SpinTracker.controller("ArticleGridViewController", function( $scope, $routeParams, ArticleFactory, FilterFactory ) {

	$scope.articles = null;
	//import search entry from FilterFactory
	$scope.search = FilterFactory;

	ArticleFactory.getAllArticles()
  .then( (articleData)  => {
		let articleArr = [];
		//assign firebase identifiers to key property, push to articleArr
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
	  	//assign firebase identifiers to key property, push to sourceArr
			Object.keys(sourceData).forEach( (key) => {
				sourceData[key].id= key;
				sourceArr.push(sourceData[key]);
			});
	  	//add relevant source info to each article for dispaly and filtering
	  	$scope.articles.forEach( (article) => {
	  		sourceArr.forEach ( (source) => {
	  			if (article.source === source.source_id) {
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

  function biasCheck(sourceBias) {
  	console.log('$scope.search.biasFilter.sourceBias', $scope.search.biasFilter.sourceBias);
  	return $scope.search.biasFilter.sourceBias;
  }

});

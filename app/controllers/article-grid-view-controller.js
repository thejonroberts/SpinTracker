'use strict';

SpinTracker.controller("ArticleGridViewController", function( $scope, $routeParams, ArticleFactory, FilterFactory, UserFactory ) {

	$scope.articles = null;
	//import search entry from FilterFactory
	$scope.filter = FilterFactory;

	//get all FB articles
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

				// sourceData[key].userDisplay = $scope.filter[]

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
	  	$scope.filter.sources = sourceArr;
	  })
	  .catch( (err) => {
	    console.log('error?', err);
	  });
	});

  $scope.biasCheck = (article) => {
  	//check current state of corresponding filter checkbox
  	return $scope.filter.biasFilter[article.bias];
  };

  let userSources = [];

  // let getUserPreferences = () => {
  // UserFactory
  	UserFactory.getUserInfo()
  	.then( (userData) => {
  		console.log('userData', userData);
  	})
  	.catch( (err) => {
  		console.log('error getting FB user info', err);
  	});
  // };



});

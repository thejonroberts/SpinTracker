'use strict';

SpinTracker.factory("FilterFactory", function($q, $http, FirebaseUrl) {
	//navbar search term and filter parameters stored here
	let biasFilter = {
		farLeft: true,
		left: true,
		center: true,
		right: true,
		farRight: true
	};

	let sources = [];

	let searchTerm = "";

	let userSourceArr = [];

  return { searchTerm, biasFilter, sources, userSourceArr };

});

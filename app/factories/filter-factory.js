'use strict';

SpinTracker.factory("FilterFactory", function () {
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

	let allSources = true;

	let userSourceArr = [];

	let dayRange = -1;

	return { searchTerm, biasFilter, sources, userSourceArr, allSources, dayRange };

});

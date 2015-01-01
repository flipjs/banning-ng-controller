void (function() {

	'use strict'

	angular.module('articles')
		.controller('ArticlesListController', ArticlesListController)

	// list is from router resolve
	ArticlesListController.$inject = ['Authentication', 'list']
	function ArticlesListController(Authentication, list) {

		var self = this

		self.articles = list
		self.authentication = Authentication
	}

})()


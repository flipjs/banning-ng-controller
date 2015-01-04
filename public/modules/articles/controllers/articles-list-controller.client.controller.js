void (function() {

	'use strict'

	angular.module('articles')
		.controller('ArticlesListController', ArticlesListController)

	// list is from router resolve
	ArticlesListController.$inject = ['Authentication', 'articles']
	function ArticlesListController(Authentication, articles) {

		var self = this

		self.articles = articles
		self.authentication = Authentication
	}

})()


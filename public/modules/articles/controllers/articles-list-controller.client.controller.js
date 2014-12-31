void (function() {

	'use strict'

	angular.module('articles')
		.controller('ArticlesListController', ArticlesListController)

	ArticlesListController.$inject = ['Authentication', 'listArticles']
	function ArticlesListController(Authentication, listArticles) {

		var self = this

		self.articles = listArticles
		self.authentication = Authentication
	}

})()


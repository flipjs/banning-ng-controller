void (function() {

	'use strict'

	angular.module('articles')
		.controller('ArticlesViewController', ArticlesViewController)

	ArticlesViewController.$inject = ['$location', 'Authentication', 'crudArticles']
	function ArticlesViewController($location, Authentication, crudArticles) {

		var self = this

		self.article = crudArticles.getArticle()
		self.authentication = Authentication
		self.remove = remove

		function remove() {
			crudArticles
				.removeArticle(self.article)
				.then(success, error)
		}

		function success() {
			$location.path('articles')
		}
		
		function error(errorMessage) {
			self.error = errorMessage
		}
	}

})()


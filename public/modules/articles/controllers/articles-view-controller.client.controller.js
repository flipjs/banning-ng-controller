void (function() {

	'use strict'

	angular.module('articles')
		.controller('ArticlesViewController', ArticlesViewController)

	ArticlesViewController.$inject = ['$location', 'Authentication', 'article']
	function ArticlesViewController($location, Authentication, article) {

		var self = this

		self.article = article
		self.authentication = Authentication
		self.remove = remove

		function remove() {
			removeArticle().then(success, error)
		}

		function success() {
			$location.path('articles')
		}
		
		function error(errorResponse) {
			self.error = errorResponse.data.message
		}

		function removeArticle() {
			var article = self.article
			return article.$remove()
		}
	}

})()


void (function() {

	'use strict'

	angular.module('articles')
		.controller('ArticlesEditController', ArticlesEditController)

	ArticlesEditController.$inject = ['$location', 'Authentication', 'crudArticles', 'article']
	function ArticlesEditController($location, Authentication, crudArticles, article) {

		var self = this

		self.article = article
		self.authentication = Authentication
		self.update = update

		function update() {
			crudArticles
				.updateArticle(self.article)
				.then(success, error)
		}

		function success(articleId) {
			$location.path('articles/' + articleId)
		}
		
		function error(errorMessage) {
			self.error = errorMessage
		}
	}

})()


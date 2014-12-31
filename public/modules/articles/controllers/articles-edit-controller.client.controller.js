void (function() {

	'use strict'

	angular.module('articles')
		.controller('ArticlesEditController', ArticlesEditController)

	ArticlesEditController.$inject = ['$location', 'Authentication', 'crudArticles']
	function ArticlesEditController($location, Authentication, crudArticles) {

		var self = this

		self.article = crudArticles.getArticle()
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


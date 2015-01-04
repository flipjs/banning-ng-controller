void (function() {

	'use strict'

	angular.module('articles')
		.controller('ArticlesEditController', ArticlesEditController)

	ArticlesEditController.$inject = ['$location', 'Authentication', 'article']
	function ArticlesEditController($location, Authentication, article) {

		var self = this

		self.article = article
		self.authentication = Authentication
		self.update = update

		function update() {
			updateArticle().then(success, error)
		}

		function success(response) {
			$location.path('articles/' + response._id)
		}
		
		function error(errorResponse) {
			self.error = errorResponse.data.message
		}

		function updateArticle() {
			var article = self.article
			return article.$update()
		}
	}

})()


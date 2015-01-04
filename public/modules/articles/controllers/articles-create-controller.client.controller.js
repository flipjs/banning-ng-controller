void (function() {

	'use strict'

	angular.module('articles')
		.controller('ArticlesCreateController', ArticlesCreateController)

	ArticlesCreateController.$inject = ['$location', 'Authentication', 'Articles']
	function ArticlesCreateController($location, Authentication, Articles) {

		var self = this

		self.article = {}
		self.authentication = Authentication
		self.create = create

		function create() {
			createArticle().then(success, error)
		}

		function success(response) {
			cleanUp()
			$location.path('articles/' + response._id)
		}
		
		function error(errorResponse) {
			self.error = errorResponse.data.message
		}

		function cleanUp() {
			self.article.title = ''
			self.article.content = ''
		}

		function createArticle() {
			var article = new Articles({
				title: self.article.title,
				content: self.article.content
			})
			return article.$save()
		}
	}


})()


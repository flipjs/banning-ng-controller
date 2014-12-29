void (function() {

	'use strict';

	angular.module('articles')
		.directive('createArticle', createArticle)
		.controller('ArticlesCreateController', ArticlesCreateController)

	function createArticle() {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'modules/articles/views/create-article.client.view.html',
			controller: 'ArticlesCreateController',
			controllerAs: 'ctrl'
		}
	}

	ArticlesCreateController.$inject = ['$location', 'Authentication', 'Articles']
	function ArticlesCreateController($location, Authentication, Articles) {

		var self = this

		self.article = {}
		self.authentication = Authentication

		self.create = function() {
			var article = new Articles({
				title: self.article.title,
				content: self.article.content
			})
			article.$save(function(response) {
				$location.path('articles/' + response._id)

				self.article.title = ''
				self.article.content = ''

			}, function(errorResponse) {
				self.error = errorResponse.data.message
			})
		}
	}

})()


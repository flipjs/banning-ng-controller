void (function() {

	'use strict';

	angular.module('articles')
		.directive('viewArticle', viewArticle)
		.controller('ArticlesViewController', ArticlesViewController)

	function viewArticle() {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'modules/articles/views/view-article.client.view.html',
			controller: 'ArticlesViewController',
			controllerAs: 'ctrl'
		}
	}

	ArticlesViewController.$inject = ['$stateParams', '$location', 'Authentication', 'Articles']
	function ArticlesViewController($stateParams, $location, Authentication, Articles) {

		var self = this

		self.article = {}
		self.authentication = Authentication

		self.remove = function(article) {
			article ? article.$remove() : self.article.$remove()
			$location.path('articles')
		}

		self.findOne = function() {
			self.article = Articles.get({
				articleId: $stateParams.articleId
			})
		}

	}

})()



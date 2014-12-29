void (function() {

	'use strict';

	angular.module('articles')
		.directive('editArticle', editArticle)
		.controller('ArticlesEditController', ArticlesEditController)

	function editArticle() {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'modules/articles/views/edit-article.client.view.html',
			controller: 'ArticlesEditController',
			controllerAs: 'ctrl'
		}
	}

	ArticlesEditController.$inject = ['$stateParams', '$location', 'Authentication', 'Articles']
	function ArticlesEditController($stateParams, $location, Authentication, Articles) {

		var self = this

		self.article = {}
		self.authentication = Authentication

		self.update = function() {
			var article = self.article

			article.$update(function() {
				$location.path('articles/' + article._id)
			}, function(errorResponse) {
				self.error = errorResponse.data.message
			})
		}

		self.findOne = function() {
			self.article = Articles.get({
				articleId: $stateParams.articleId
			})
		}

	}

})()



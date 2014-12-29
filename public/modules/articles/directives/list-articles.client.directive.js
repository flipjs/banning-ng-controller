void (function() {

	'use strict';

	angular.module('articles')
		.directive('listArticles', listArticles)
		.controller('ArticlesListController', ArticlesListController)

	function listArticles() {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'modules/articles/views/list-articles.client.view.html',
			controller: 'ArticlesListController',
			controllerAs: 'ctrl'
		}
	}

	ArticlesListController.$inject = ['$location', 'Authentication', 'Articles']
	function ArticlesListController($location, Authentication, Articles) {

		var self = this

		self.articles = []
		self.authentication = Authentication

		self.find = function() {
			self.articles = Articles.query()
		}

	}

})()



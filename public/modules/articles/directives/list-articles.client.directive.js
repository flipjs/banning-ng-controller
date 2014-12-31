void (function() {

	'use strict'

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

	ArticlesListController.$inject = ['$location', 'Authentication', 'crudArticles']
	function ArticlesListController($location, Authentication, crudArticles) {

		var self = this

        self.articles = crudArticles.getArticles()
		self.authentication = Authentication

	}

})()



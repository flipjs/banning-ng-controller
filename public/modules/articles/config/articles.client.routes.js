void (function() {

	'use strict'

	// Setting up route
	angular.module('articles')
		.config(routeConfig)

	routeConfig.$inject = ['$stateProvider']
	function routeConfig($stateProvider) {
		// Articles state routing
		$stateProvider
			.state('listArticles', {
				url: '/articles',
				templateUrl: 'modules/articles/views/list-articles.client.view.html',
				controller: 'ArticlesListController',
				controllerAs: 'ctrl',
				resolve: {
					listArticles: listArticles
				}
			})
			.state('createArticle', {
				url: '/articles/create',
				templateUrl: 'modules/articles/views/create-article.client.view.html',
				controller: 'ArticlesCreateController',
				controllerAs: 'ctrl'
			})
			.state('viewArticle', {
				url: '/articles/:articleId',
				templateUrl: 'modules/articles/views/view-article.client.view.html',
				controller: 'ArticlesViewController',
				controllerAs: 'ctrl'
			})
			.state('editArticle', {
				url: '/articles/:articleId/edit',
				templateUrl: 'modules/articles/views/edit-article.client.view.html',
				controller: 'ArticlesEditController',
				controllerAs: 'ctrl'
			})
	}

	listArticles.$inject = ['crudArticles']
	function listArticles(crudArticles) {
		return crudArticles.getArticles()
	}

})()

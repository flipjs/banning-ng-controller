void (function() {

	'use strict'

	// Setting up route
	angular.module('articles')
		.config(routeConfig)

	routeConfig.$inject = ['$stateProvider']
	function routeConfig($stateProvider) {
		// Articles state routing
		$stateProvider
			.state('listArticles', routeConfig.listArticles)
			.state('createArticle', routeConfig.createArticle)
			.state('viewArticle', routeConfig.viewArticle)
			.state('editArticle', routeConfig.editArticle)
	}

	routeConfig.resolveArticle = {
		$stateParams: '$stateParams',
		Articles: 'Articles',
		article: function article($stateParams, Articles) {
			return Articles.get({
				articleId: $stateParams.articleId
			}).$promise
		}
	}

	routeConfig.listArticles = {
		url: '/articles',
		templateUrl: 'modules/articles/views/list-articles.client.view.html',
		controller: 'ArticlesListController',
		controllerAs: 'ctrl',
		resolve: {
			Articles: 'Articles',
			articles: function articles(Articles) {
				return Articles.query().$promise
			}
		}
	}

	routeConfig.createArticle = {
		url: '/articles/create',
		templateUrl: 'modules/articles/views/create-article.client.view.html',
		controller: 'ArticlesCreateController',
		controllerAs: 'ctrl'
	}

	routeConfig.viewArticle = {
		url: '/articles/:articleId',
		templateUrl: 'modules/articles/views/view-article.client.view.html',
		controller: 'ArticlesViewController',
		controllerAs: 'ctrl',
		resolve: routeConfig.resolveArticle
	}

	routeConfig.editArticle = {
		url: '/articles/:articleId/edit',
		templateUrl: 'modules/articles/views/edit-article.client.view.html',
		controller: 'ArticlesEditController',
		controllerAs: 'ctrl',
		resolve: routeConfig.resolveArticle
	}

})()

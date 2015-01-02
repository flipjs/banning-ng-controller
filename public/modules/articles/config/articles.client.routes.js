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

	routeConfig.getArticle = function($stateParams, crudArticles) {
		return crudArticles.getArticle($stateParams.articleId)
	}
	routeConfig.getArticle.$inject = ['$stateParams', 'crudArticles']

	routeConfig.listArticles = {
		url: '/articles',
		templateUrl: 'modules/articles/views/list-articles.client.view.html',
		controller: 'ArticlesListController',
		controllerAs: 'ctrl',
		resolve: {
			articles: 'crudArticles',
			list: function list(articles) {
				return articles.getArticles()
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
		resolve: {
			article: routeConfig.getArticle
		}
	}

	routeConfig.editArticle = {
		url: '/articles/:articleId/edit',
		templateUrl: 'modules/articles/views/edit-article.client.view.html',
		controller: 'ArticlesEditController',
		controllerAs: 'ctrl',
		resolve: {
			article: routeConfig.getArticle
		}
	}

})()

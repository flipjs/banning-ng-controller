void (function() {

	'use strict'

	// Setting up route
	angular.module('articles')
		.config(routeConfig)

	routeConfig.$inject = ['$stateProvider']
	function routeConfig($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			template: '<list-articles></list-articles>'
		}).
		state('createArticle', {
			url: '/articles/create',
			template: '<create-article></create-article>'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			template: '<view-article></view-article>'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			template: '<edit-article></edit-article>'
		})
	}

})()

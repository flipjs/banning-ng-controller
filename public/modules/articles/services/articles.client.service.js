'use strict'

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			query: {
				method: 'GET',
				isArray: true,
				transformResponse: function(data) {
					var articles = angular.fromJson(data)
					angular.forEach(articles, function(article, idx) {
						article.title = article.title.toUpperCase()[0] + article.title.slice(1)
						articles[idx] = article
					})
					return articles
				}
			}
		})
	}
])

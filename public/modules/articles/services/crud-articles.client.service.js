void (function(angular) {

	'use strict'

	angular.module('articles')
		.factory('crudArticles', crudArticles)

	crudArticles.$inject = ['$stateParams', '$q', 'Articles']
	function crudArticles($stateParams, $q, Articles) {

		var service = {
			createArticle : createArticle,
			getArticle	  : getArticle,
			getArticles   : getArticles,
			removeArticle : removeArticle,
			updateArticle : updateArticle
		}
		return service

		// function declarations

		function createArticle(newArticle) {
			var article = newArticleInstance(newArticle)
			return operation(article, '$save')
		}

		function newArticleInstance(newArticle) {
			return new Articles({
				title: newArticle.title,
				content: newArticle.content
			})
		}

		function getArticles() {
			return Articles.query()
		}

		function getArticle() {
			return Articles.get({
				articleId: $stateParams.articleId
			})
		}

		function removeArticle(article) {
			return operation(article, '$remove')
		}

		function updateArticle(article) {
			return operation(article, '$update')
		}

		function operation(data, crud) {
			var defer = $q.defer()

			data[crud](function(response) {
				defer.resolve(response._id)
			}, function(errorResponse) {
				defer.reject(errorResponse.data.message)
			})

			return defer.promise
		}
	}

})(angular)


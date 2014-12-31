void (function(angular) {
  
	'use strict';

	angular.module('articles')
        .factory('crudArticles', articlesCrud)

	articlesCrud.$inject = ['$stateParams', '$q', 'Articles']
	function articlesCrud($stateParams, $q, Articles) {

        var service = {
            createArticle : createArticle,
            getArticle    : getArticle,
            getArticles   : getArticles,
            removeArticle : removeArticle,
            updateArticle : updateArticle
        }
        return service

        // function declarations

		function createArticle(article) {
            var defer = $q.defer(),
                data = newArticle(article)

			data.$save(function(response) {
                defer.resolve(response._id)
			}, function(errorResponse) {
                defer.reject(errorResponse.data.message)
			})

            return defer.promise
		}

        function newArticle(article) {
            return new Articles({
                title: article.title,
                content: article.content
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
            var defer = $q.defer()

			article.$remove(function(response) {
                defer.resolve(response._id)
			}, function(errorResponse) {
                defer.reject(errorResponse.data.message)
			})

            return defer.promise
		}

		function updateArticle(article) {
            var defer = $q.defer()

			article.$update(function(response) {
                defer.resolve(response._id)
			}, function(errorResponse) {
                defer.reject(errorResponse.data.message)
			})

            return defer.promise
		}
	}

})(angular)


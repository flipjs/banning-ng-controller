void (function() {

	'use strict'

	angular.module('articles')
		.directive('createArticle', createArticle)
		.controller('ArticlesCreateController', ArticlesCreateController)

	function createArticle() {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'modules/articles/views/create-article.client.view.html',
			controller: 'ArticlesCreateController',
			controllerAs: 'ctrl'
		}
	}

	ArticlesCreateController.$inject = ['$location', 'Authentication', 'crudArticles']
	function ArticlesCreateController($location, Authentication, crudArticles) {

		var self = this

        self.article = {}
		self.authentication = Authentication
        self.create = create

		function create() {
            crudArticles
                .createArticle(self.article)
                .then(success, error)
		}

        function success(articleId) {
            $location.path('articles/' + articleId)
            cleanUp()
        }
        
        function error(errorMessage) {
            self.error = errorMessage
        }

        function cleanUp() {
            self.article.title = ''
            self.article.content = ''
        }
	}

})()


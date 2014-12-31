void (function() {

	'use strict'

	angular.module('articles')
		.directive('viewArticle', viewArticle)
		.controller('ArticlesViewController', ArticlesViewController)

	function viewArticle() {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'modules/articles/views/view-article.client.view.html',
			controller: 'ArticlesViewController',
			controllerAs: 'ctrl'
		}
	}

	ArticlesViewController.$inject = ['$location', 'Authentication', 'crudArticles']
	function ArticlesViewController($location, Authentication, crudArticles) {

		var self = this

        self.article = crudArticles.getArticle()
		self.authentication = Authentication
        self.remove = remove

		function remove() {
            crudArticles
                .removeArticle(self.article)
                .then(success, error)
		}

        function success() {
            $location.path('articles')
        }
        
        function error(errorMessage) {
            self.error = errorMessage
        }
	}

})()



void (function() {

	'use strict';

	angular.module('articles')
		.directive('editArticle', editArticle)
		.controller('ArticlesEditController', ArticlesEditController)

	function editArticle() {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'modules/articles/views/edit-article.client.view.html',
			controller: 'ArticlesEditController',
			controllerAs: 'ctrl'
		}
	}

	ArticlesEditController.$inject = ['$location', 'Authentication', 'crudArticles']
	function ArticlesEditController($location, Authentication, crudArticles) {

		var self = this

        self.article = crudArticles.getArticle()
		self.authentication = Authentication
        self.update = update

		function update() {
            crudArticles
                .updateArticle(self.article)
                .then(success, error)
		}

        function success(articleId) {
            $location.path('articles/' + articleId)
        }
        
        function error(errorMessage) {
            self.error = errorMessage
        }
	}

})()



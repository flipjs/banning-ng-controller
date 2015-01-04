'use strict';

(function() {
	// Articles view controller Controller Spec
	describe('Articles view controller Controller Tests', function() {
		// Initialize global variables
		var ArticlesViewController,
			article,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, _$location_, _$stateParams_, _$httpBackend_) {

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Articles view controller controller.
			ArticlesViewController = $controller('ArticlesViewController', {
				article: article
			});
		}));

		it('ArticlesViewController should create an array with one article object fetched from XHR using a articleId URL parameter', inject(function(Articles, crudArticles) {
			// Define a sample article object
			var sampleArticle = new Articles({
				title: 'An Article about MEAN',
				content: 'MEAN rocks!'
			})

			// Set the URL parameter
			$stateParams.articleId = '525a8422f6d0f87f0e407a33'

			// Set GET response
			$httpBackend.expectGET(/articles\/([0-9a-fA-F]{24})$/).respond(sampleArticle)

			// Run controller functionality
			ArticlesViewController.article = sampleArticle
			crudArticles.getArticle($stateParams.articleId)
			$httpBackend.flush()

			// Test scope value
			expect(ArticlesViewController.article).toEqualData(sampleArticle)
		}))

		it('ArticlesViewController.remove() should send a DELETE request with a valid articleId and remove the article from the scope', inject(function(Articles) {
			// Create new article object
			var sampleArticle = new Articles({
				_id: '525a8422f6d0f87f0e407a33'
			})

			// Create the controller's article
			ArticlesViewController.article = sampleArticle

			// Set expected DELETE response
			$httpBackend.expectDELETE(/articles\/([0-9a-fA-F]{24})$/).respond(204)

			// Run controller functionality
			ArticlesViewController.remove()
			$httpBackend.flush()

			// Test URL redirection after the article was removed
			expect($location.path()).toBe('/articles')
		}))
	});
}());

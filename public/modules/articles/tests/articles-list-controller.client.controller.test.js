'use strict';

(function() {
	// Articles list controller Controller Spec
	describe('Articles list controller Controller Tests', function() {
		// Initialize global variables
		var ArticlesListController,
			articles,
			$httpBackend,
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
		beforeEach(inject(function($controller, _$location_, _$httpBackend_) {

			// Point global variables to injected services
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Articles list controller controller.
			ArticlesListController = $controller('ArticlesListController', {
				articles: articles
			});
		}));

		it('ArticlesListController should create an array with at least one article object fetched from XHR', inject(function(Articles, crudArticles) {
			// Create sample article using the Articles service
			var sampleArticle = new Articles({
				title: 'An Article about MEAN',
				content: 'MEAN rocks!'
			})

			// Create a sample articles array that includes the new article
			var sampleArticles = [sampleArticle]

			// Set GET response
			$httpBackend.expectGET('articles').respond(sampleArticles)
			ArticlesListController.articles = crudArticles.getArticles()
			$httpBackend.flush()

			// Test scope value
			expect(ArticlesListController.articles).toEqualData(sampleArticles)
		}))
	});
}());

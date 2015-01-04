'use strict';

(function() {
	// Articles create controller Controller Spec
	describe('Articles create controller Controller Tests', function() {
		// Initialize global variables
		var ArticlesCreateController,
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

			// Initialize the Articles create controller controller.
			ArticlesCreateController = $controller('ArticlesCreateController');
		}));

		it('ArticlesCreateController.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Articles) {
			// Create a sample article object
			var sampleArticlePostData = new Articles({
				title: 'An Article about MEAN',
				content: 'MEAN rocks!'
			})

			// Create a sample article response
			var sampleArticleResponse = new Articles({
				_id: '525cf20451979dea2c000001',
				title: 'An Article about MEAN',
				content: 'MEAN rocks!'
			})

			// Fixture mock form input values
			ArticlesCreateController.article.title = 'An Article about MEAN'
			ArticlesCreateController.article.content = 'MEAN rocks!'

			// Set POST response
			$httpBackend.expectPOST('articles', sampleArticlePostData).respond(sampleArticleResponse)

			// Run controller functionality
			ArticlesCreateController.create()
			$httpBackend.flush()

			// Test form inputs are reset
			expect(ArticlesCreateController.article.title).toEqual('')
			expect(ArticlesCreateController.article.content).toEqual('')

			// Test URL redirection after the article was created
			expect($location.path()).toBe('/articles/' + sampleArticleResponse._id)
		}))

	});
}());

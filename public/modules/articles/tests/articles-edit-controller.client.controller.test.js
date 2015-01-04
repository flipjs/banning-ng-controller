'use strict';

(function() {
	// Articles edit controller Controller Spec
	describe('Articles edit controller Controller Tests', function() {
		// Initialize global variables
		var ArticlesEditController,
			article,
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

			// Initialize the Articles edit controller controller.
			ArticlesEditController = $controller('ArticlesEditController', {
				article: article
			});
		}));

		it('ArticlesEditController.update() should update a valid article', inject(function(Articles) {
			// Define a sample article put data
			var sampleArticlePutData = new Articles({
				_id: '525cf20451979dea2c000001',
				title: 'An Article about MEAN',
				content: 'MEAN Rocks!'
			})

			// Mock article in scope
			ArticlesEditController.article = sampleArticlePutData

			// Set PUT response
			$httpBackend.expectPUT(/articles\/([0-9a-fA-F]{24})$/).respond()

			// Run controller functionality
			ArticlesEditController.update()
			$httpBackend.flush()

			// Test URL location to new object
			expect($location.path()).toBe('/articles/' + sampleArticlePutData._id)
		}))

	});
}());

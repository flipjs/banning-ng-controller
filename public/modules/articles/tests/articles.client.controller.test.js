void (function() {
  'use strict'
	// Articles Controller Spec
	describe('ArticlesController', function() {
		// Initialize global variables
		var ArticlesController,
			scope,
			$httpBackend,
			$stateParams,
			$location

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
							}
						}
					}
				}
			})
		})

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName))

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new()

			// Point global variables to injected services
			$stateParams = _$stateParams_
			$httpBackend = _$httpBackend_
			$location = _$location_

			// Initialize the Articles controller.
			ArticlesController = $controller('ArticlesController', {
				$scope: scope
			})
		}))

		it('ArticlesController.find() should create an array with at least one article object fetched from XHR', inject(function(Articles) {
			// Create sample article using the Articles service
			var sampleArticle = new Articles({
				title: 'An Article about MEAN',
				content: 'MEAN rocks!'
			})

			// Create a sample articles array that includes the new article
			var sampleArticles = [sampleArticle]

			// Set GET response
			$httpBackend.expectGET('articles').respond(sampleArticles)

			// Run controller functionality
			ArticlesController.find()
			$httpBackend.flush()

			// Test scope value
			expect(ArticlesController.articles).toEqualData(sampleArticles)
		}))

		it('ArticlesController.findOne() should create an array with one article object fetched from XHR using a articleId URL parameter', inject(function(Articles) {
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
			ArticlesController.findOne()
			$httpBackend.flush()

			// Test scope value
			expect(ArticlesController.article).toEqualData(sampleArticle)
		}))

		it('ArticlesController.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Articles) {
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
			ArticlesController.article.title = 'An Article about MEAN'
			ArticlesController.article.content = 'MEAN rocks!'

			// Set POST response
			$httpBackend.expectPOST('articles', sampleArticlePostData).respond(sampleArticleResponse)

			// Run controller functionality
			ArticlesController.create()
			$httpBackend.flush()

			// Test form inputs are reset
			expect(ArticlesController.article.title).toEqual('')
			expect(ArticlesController.article.content).toEqual('')

			// Test URL redirection after the article was created
			expect($location.path()).toBe('/articles/' + sampleArticleResponse._id)
		}))

		it('ArticlesController.update() should update a valid article', inject(function(Articles) {
			// Define a sample article put data
			var sampleArticlePutData = new Articles({
				_id: '525cf20451979dea2c000001',
				title: 'An Article about MEAN',
				content: 'MEAN Rocks!'
			})

			// Mock article in scope
			ArticlesController.article = sampleArticlePutData

			// Set PUT response
			$httpBackend.expectPUT(/articles\/([0-9a-fA-F]{24})$/).respond()

			// Run controller functionality
			ArticlesController.update()
			$httpBackend.flush()

			// Test URL location to new object
			expect($location.path()).toBe('/articles/' + sampleArticlePutData._id)
		}))

		it('ArticlesController.remove() should send a DELETE request with a valid articleId and remove the article from the scope', inject(function(Articles) {
			// Create new article object
			var sampleArticle = new Articles({
				_id: '525a8422f6d0f87f0e407a33'
			})

			// Create new articles array and include the article
			ArticlesController.articles = [sampleArticle]

			// Set expected DELETE response
			$httpBackend.expectDELETE(/articles\/([0-9a-fA-F]{24})$/).respond(204)

			// Run controller functionality
			ArticlesController.remove(sampleArticle)
			$httpBackend.flush()

			// Test array after successful delete
			expect(ArticlesController.articles.length).toBe(0)
		}))
	})
}())

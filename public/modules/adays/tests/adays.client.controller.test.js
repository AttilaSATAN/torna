'use strict';

(function() {
	// Adays Controller Spec
	describe('Adays Controller Tests', function() {
		// Initialize global variables
		var AdaysController,
		scope,
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
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Adays controller.
			AdaysController = $controller('AdaysController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Aday object fetched from XHR', inject(function(Adays) {
			// Create sample Aday using the Adays service
			var sampleAday = new Adays({
				name: 'New Aday'
			});

			// Create a sample Adays array that includes the new Aday
			var sampleAdays = [sampleAday];

			// Set GET response
			$httpBackend.expectGET('adays').respond(sampleAdays);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.adays).toEqualData(sampleAdays);
		}));

		it('$scope.findOne() should create an array with one Aday object fetched from XHR using a adayId URL parameter', inject(function(Adays) {
			// Define a sample Aday object
			var sampleAday = new Adays({
				name: 'New Aday'
			});

			// Set the URL parameter
			$stateParams.adayId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/adays\/([0-9a-fA-F]{24})$/).respond(sampleAday);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.aday).toEqualData(sampleAday);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Adays) {
			// Create a sample Aday object
			var sampleAdayPostData = new Adays({
				name: 'New Aday'
			});

			// Create a sample Aday response
			var sampleAdayResponse = new Adays({
				_id: '525cf20451979dea2c000001',
				name: 'New Aday'
			});

			// Fixture mock form input values
			scope.name = 'New Aday';

			// Set POST response
			$httpBackend.expectPOST('adays', sampleAdayPostData).respond(sampleAdayResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Aday was created
			expect($location.path()).toBe('/adays/' + sampleAdayResponse._id);
		}));

		it('$scope.update() should update a valid Aday', inject(function(Adays) {
			// Define a sample Aday put data
			var sampleAdayPutData = new Adays({
				_id: '525cf20451979dea2c000001',
				name: 'New Aday'
			});

			// Mock Aday in scope
			scope.aday = sampleAdayPutData;

			// Set PUT response
			$httpBackend.expectPUT(/adays\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/adays/' + sampleAdayPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid adayId and remove the Aday from the scope', inject(function(Adays) {
			// Create new Aday object
			var sampleAday = new Adays({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Adays array and include the Aday
			scope.adays = [sampleAday];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/adays\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAday);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.adays.length).toBe(0);
		}));
	});
}());
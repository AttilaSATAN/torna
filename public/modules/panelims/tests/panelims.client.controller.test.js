'use strict';

(function() {
	// Panelims Controller Spec
	describe('Panelims Controller Tests', function() {
		// Initialize global variables
		var PanelimsController,
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

			// Initialize the Panelims controller.
			PanelimsController = $controller('PanelimsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Panelim object fetched from XHR', inject(function(Panelims) {
			// Create sample Panelim using the Panelims service
			var samplePanelim = new Panelims({
				name: 'New Panelim'
			});

			// Create a sample Panelims array that includes the new Panelim
			var samplePanelims = [samplePanelim];

			// Set GET response
			$httpBackend.expectGET('panelims').respond(samplePanelims);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.panelims).toEqualData(samplePanelims);
		}));

		it('$scope.findOne() should create an array with one Panelim object fetched from XHR using a panelimId URL parameter', inject(function(Panelims) {
			// Define a sample Panelim object
			var samplePanelim = new Panelims({
				name: 'New Panelim'
			});

			// Set the URL parameter
			$stateParams.panelimId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/panelims\/([0-9a-fA-F]{24})$/).respond(samplePanelim);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.panelim).toEqualData(samplePanelim);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Panelims) {
			// Create a sample Panelim object
			var samplePanelimPostData = new Panelims({
				name: 'New Panelim'
			});

			// Create a sample Panelim response
			var samplePanelimResponse = new Panelims({
				_id: '525cf20451979dea2c000001',
				name: 'New Panelim'
			});

			// Fixture mock form input values
			scope.name = 'New Panelim';

			// Set POST response
			$httpBackend.expectPOST('panelims', samplePanelimPostData).respond(samplePanelimResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Panelim was created
			expect($location.path()).toBe('/panelims/' + samplePanelimResponse._id);
		}));

		it('$scope.update() should update a valid Panelim', inject(function(Panelims) {
			// Define a sample Panelim put data
			var samplePanelimPutData = new Panelims({
				_id: '525cf20451979dea2c000001',
				name: 'New Panelim'
			});

			// Mock Panelim in scope
			scope.panelim = samplePanelimPutData;

			// Set PUT response
			$httpBackend.expectPUT(/panelims\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/panelims/' + samplePanelimPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid panelimId and remove the Panelim from the scope', inject(function(Panelims) {
			// Create new Panelim object
			var samplePanelim = new Panelims({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Panelims array and include the Panelim
			scope.panelims = [samplePanelim];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/panelims\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePanelim);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.panelims.length).toBe(0);
		}));
	});
}());
'use strict';

// Panelims controller
angular.module('panelims').controller('PanelimsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Panelims',
	function($scope, $stateParams, $location, Authentication, Panelims ) {
		$scope.authentication = Authentication;

		// Create new Panelim
		$scope.create = function() {
			// Create new Panelim object
			var panelim = new Panelims ({
				name: this.name
			});

			// Redirect after save
			panelim.$save(function(response) {
				$location.path('panelims/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Panelim
		$scope.remove = function( panelim ) {
			if ( panelim ) { panelim.$remove();

				for (var i in $scope.panelims ) {
					if ($scope.panelims [i] === panelim ) {
						$scope.panelims.splice(i, 1);
					}
				}
			} else {
				$scope.panelim.$remove(function() {
					$location.path('panelims');
				});
			}
		};

		// Update existing Panelim
		$scope.update = function() {
			var panelim = $scope.panelim ;

			panelim.$update(function() {
				$location.path('panelims/' + panelim._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Panelims
		$scope.find = function() {
			$scope.panelims = Panelims.query();
		};

		// Find existing Panelim
		$scope.findOne = function() {
			$scope.panelim = Panelims.get({ 
				panelimId: $stateParams.panelimId
			});
		};
	}
]);
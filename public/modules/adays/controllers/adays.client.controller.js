'use strict';

// Adays controller
angular.module('adays').controller('AdaysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Adays',
	function($scope, $stateParams, $location, Authentication, Adays ) {
		$scope.authentication = Authentication;

		// Create new Aday
		$scope.create = function() {
			// Create new Aday object
			var aday = new Adays ({
				name: this.name
			});

			// Redirect after save
			aday.$save(function(response) {
				$location.path('adays/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Aday
		$scope.remove = function( aday ) {
			if ( aday ) { aday.$remove();

				for (var i in $scope.adays ) {
					if ($scope.adays [i] === aday ) {
						$scope.adays.splice(i, 1);
					}
				}
			} else {
				$scope.aday.$remove(function() {
					$location.path('adays');
				});
			}
		};

		// Update existing Aday
		$scope.update = function() {
			var aday = $scope.aday ;

			aday.$update(function() {
				$location.path('adays/' + aday._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Adays
		$scope.find = function() {
			$scope.adays = Adays.query();
		};

		// Find existing Aday
		$scope.findOne = function() {
			$scope.aday = Adays.get({ 
				adayId: $stateParams.adayId
			});
		};
	}
]);
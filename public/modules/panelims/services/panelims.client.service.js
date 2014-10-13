'use strict';

//Panelims service used to communicate Panelims REST endpoints
angular.module('panelims').factory('Panelims', ['$resource',
	function($resource) {
		return $resource('panelims/:panelimId', { panelimId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
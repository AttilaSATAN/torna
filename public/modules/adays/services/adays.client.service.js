'use strict';

//Adays service used to communicate Adays REST endpoints
angular.module('adays').factory('Adays', ['$resource',
	function($resource) {
		return $resource('adays/:adayId', { adayId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
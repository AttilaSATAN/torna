'use strict';

//Setting up route
angular.module('adays').config(['$stateProvider',
	function($stateProvider) {
		// Adays state routing
		$stateProvider.
		state('listAdays', {
			url: '/adays',
			templateUrl: 'modules/adays/views/list-adays.client.view.html'
		}).
		state('createAday', {
			url: '/adays/create',
			templateUrl: 'modules/adays/views/create-aday.client.view.html'
		}).
		state('viewAday', {
			url: '/adays/:adayId',
			templateUrl: 'modules/adays/views/view-aday.client.view.html'
		}).
		state('editAday', {
			url: '/adays/:adayId/edit',
			templateUrl: 'modules/adays/views/edit-aday.client.view.html'
		});
	}
]);
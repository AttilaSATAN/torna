'use strict';

// Configuring the Articles module
angular.module('adays').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Adaylar', 'adays', 'dropdown', '/adays(/create)?');
		Menus.addSubMenuItem('topbar', 'adays', 'List Adays', 'adays');
		Menus.addSubMenuItem('topbar', 'adays', 'New Aday', 'adays/create');
	}
]);
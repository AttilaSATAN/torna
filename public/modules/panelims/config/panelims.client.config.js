'use strict';

// Configuring the Articles module
angular.module('panelims').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Panelim', 'panelim');
	}
]);
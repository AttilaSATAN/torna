'use strict';

//Setting up route
angular.module('panelims').config(['$stateProvider',
 function ($stateProvider) {
        // Panelims state routing
        $stateProvider.
        state('panelim.derslerim', {
            url: '/derslerim',
            views: {
                '': {
                    templateUrl: 'modules/panelims/views/panelim.client.view.html'
                },
                'panelim': {
                    templateUrl: 'modules/panelims/views/derslerim.client.view.html'
                }
            }
        }).
        state('panelim', {
            url: '/panelim',
            views: {
                '': {
                    templateUrl: 'modules/panelims/views/panelim.client.view.html'
                },
                'panelim': {
                    templateUrl: 'modules/panelims/views/panelim-home.client.view.html'
                }
            }

        });
 }
]);
'use strict';

angular.module('panelims').controller('DerslerimController', ['$scope', '$stateParams', '$location', 'Authentication',
 function ($scope, $stateParams, $location, Authentication) {
        $scope.classes = [
            {
                title: 'Torna',
                open: false

            },
            {
                title: 'CNC',
                open: false

            },
            {
                title: 'Elektrik',
                open: false

            },
            {
                title: 'Hidrolik',
                open: false

            },
            {
                title: 'Kaynak',
                open: false

            },
        ]

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    }]);
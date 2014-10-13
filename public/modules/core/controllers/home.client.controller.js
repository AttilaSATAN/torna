'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
 function ($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.interval = 3000;
        $scope.slides = [];
        $scope.addSlide = function (n) {

            $scope.slides.push({
                image: '/modules/core/img/banners/' + n + '.jpg'
            });
        };
        for (var i = 0; i < 4; i++) {
            $scope.addSlide(i+1);
        }
 }
]);
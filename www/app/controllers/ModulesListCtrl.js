'use strict';
angular.module('mctrainer').controller('ModulesListCtrl', function ($scope, $state, $ionicPopover, ModuleData, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.setTitle('MC-Trainer');

    this.modules = ModuleData.findAll();

    $ionicPopover.fromTemplateUrl('popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    })

    this.showStats = function () {
        //TODO
        alert("Stats TODO");
    };
});

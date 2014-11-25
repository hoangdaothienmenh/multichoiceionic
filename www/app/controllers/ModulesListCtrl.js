'use strict';
angular.module('mctrainer').controller('ModulesListCtrl', function ($scope, $state, $ionicPopover,$ionicModal, ModuleData, $ionicNavBarDelegate) {
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
    $ionicModal.fromTemplateUrl('templates/ModuleSearchModal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
    }).then(function (modal) {
        $scope.modal = modal;
    });

    this.openModal = function () {
        $scope.modules = ModuleData.findAll();
        $scope.modal.show();
    };

    this.goDetails = function(index){
       $state.go('details', {name: this.modules[index].name});
    }
});

'use strict';
angular.module('mctrainer').controller('ModulesListCtrl', function ($scope, $state, $ionicPopover, $ionicModal, ModuleData, $ionicNavBarDelegate, $ionicPopup) {
    $ionicNavBarDelegate.setTitle('MC-Trainer');

    this.modules = ModuleData.getUserModules();

    $ionicPopover.fromTemplateUrl('popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

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
        $scope.modules = ModuleData.getModules();
        $scope.modal.show();
    };

    var thisCtrl = this;
    $scope.moduleSelected = function (module) {
        var copy = false;
        var oldModule;
        for (var i = 0; i < thisCtrl.modules.length; i++) {
            if (thisCtrl.modules[i].name == module.name) {
                copy = true;
                oldModule = thisCtrl.modules[i];
            }
        }
        if (copy) {
            $ionicPopup.confirm({
                title: 'Das Modul ist schon vorhanden wollen sie es überschreiben?'
                + '<br><small>' + 'Achtung die Statistik dieses Moduls wird zurückgesetzt!' + '</small>'
            }).then(function (res) {
                if (res) {
                    ModuleData.removeModule(oldModule.$id);
                    ModuleData.addModuleToUser(module);
                    $scope.modal.hide();
                }
            });
        } else {
            ModuleData.addModuleToUser(module);
        }
    };

    // Funktion zum Übergang von der Modulliste zur Detailansicht eines Moduls
    this.goDetails = function (index) {
        $state.go('details', {name: this.modules[index].name});
    }

});

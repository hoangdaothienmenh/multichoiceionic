'use strict';
angular.module('mctrainer').controller('ModulesListCtrl',
    function ($scope, $state, $timeout, $ionicPopover, $ionicModal, ModuleData, $ionicNavBarDelegate, $ionicPopup, $ionicLoading) {
        $ionicNavBarDelegate.title("Home");
        var that = this;
        $ionicLoading.show({
            template: 'Loading...'
        });
        $timeout(function () {
            $ionicNavBarDelegate.title("Home");
            $ionicLoading.hide();
        }, 500);
        that.modules = ModuleData.getUserModules();

        $ionicModal.fromTemplateUrl('templates/ModuleSearchModal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.modal = modal;
        });

        this.openModal = function () {
            $scope.moduleList = ModuleData.getModules();
            $scope.modal.show();
        };

        $scope.moduleSelected = function (module) {
            var copy = false;
            var oldModule;
            if (typeof that.modules !== 'undefined') {
                for (var i = 0; i < that.modules.length; i++) {
                    if (that.modules[i].name == module.name) {
                        copy = true;
                        oldModule = that.modules[i];
                    }
                }
                if (copy) {
                    $ionicPopup.confirm({
                        title: 'Das Modul ist schon vorhanden. Soll es überschrieben werden?'
                        + '<br><small>' + 'Achtung: Die Statistik dieses Moduls wird zurückgesetzt!' + '</small>'
                    }).then(function (res) {
                        if (res) {
                            ModuleData.removeModule(oldModule.$id);
                            ModuleData.addModuleToUser(module);
                        }
                    });
                } else {
                    ModuleData.addModuleToUser(module);
                }
            }else{
                ModuleData.addModuleToUser(module);
            }
            that.modules = ModuleData.getUserModules();
            $scope.modal.hide();
        };

        /**
         * Funktion zum Übergang von der Modulliste zur Detailansicht eines Moduls
         */
        this.goDetails = function (index) {
            $state.go('details', {name: this.modules[index].name});
        }

    });

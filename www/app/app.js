angular.module('mctrainer', ['ionic', 'firebase', 'angles'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('modules', {
                url: '/modules',
                templateUrl: 'templates/ModulesList.html',
                controller: 'ModulesListCtrl as mlCtrl'
            })
            .state('question', {
                url: '/modules/:name',
                templateUrl: 'templates/QuestionView.html',
                controller: 'QuestionViewCtrl as qvCtrl'
            }).state('details',{
                url: '/modules/details/:name',
                templateUrl: 'templates/DetailsView.html',
                controller: 'DetailsViewCtrl as dvCtrl'
            });

        $urlRouterProvider.otherwise('/modules');
    })

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if
            (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(
                    true);
            }
            if
            (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });
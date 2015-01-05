angular.module('mctrainer').controller('DetailsViewCtrl', function ($scope, $state,$stateParams, ModuleData, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.title($stateParams.name);
    var questions = ModuleData.findByName($stateParams.name).questions;
    this.questions = questions;
    this.answers = questions.answers;

    this.showStats = function(q){
        console.log(q);
    }
});
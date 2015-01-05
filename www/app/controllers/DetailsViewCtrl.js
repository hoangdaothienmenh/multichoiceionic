angular.module('mctrainer').controller('DetailsViewCtrl', function ($scope, $state,$stateParams, ModuleData, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.title($stateParams.name);
    var questions = ModuleData.findByName($stateParams.name).questions;
    //TODO
    this.questions = questions;
    this.correct = questions.answers;

    console.log(answers);
    this.answers = answers;

    this.showStats = function(q){
        console.log(q);
    }
});
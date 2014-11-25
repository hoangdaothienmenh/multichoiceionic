angular.module('mctrainer').controller('DetailsViewCtrl', function ($scope, $state,$stateParams, ModuleData, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.setTitle($stateParams.name);
    var questions = ModuleData.findByName($stateParams.name).questions;
    this.questions = questions;
    this.answers = questions.answers;
    console.log(questions[0]);

    this.showStats = function(q){
        console.log(q);
    }
});
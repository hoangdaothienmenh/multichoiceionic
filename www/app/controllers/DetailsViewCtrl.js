angular.module('mctrainer').controller('DetailsViewCtrl', function ($ionicModal, $scope, $state,$stateParams, ModuleData, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.title($stateParams.name);
    var questions = ModuleData.findByName($stateParams.name).questions;
    var moduleID = ModuleData.findByName($stateParams.name).moduleID;
    this.questions = questions;
    this.correct = questions.answers;

    this.showQuestion = function(q){
        this.isCorrect = [];
        this.frage = q.question;
        this.answers = Object.keys(q.answers);

        for (var i = 0; i < this.answers.length; i++) {
            this.isCorrect[i] = q.answers[this.answers[i]];
        }

        $scope.modal.show();
    };

    this.resetStats = function () {
        ModuleData.resetStats(false, moduleID);
    };

    $ionicModal.fromTemplateUrl('templates/ShowQuestionModal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
    }).then(function (modal) {
        $scope.modal = modal;
    });


});
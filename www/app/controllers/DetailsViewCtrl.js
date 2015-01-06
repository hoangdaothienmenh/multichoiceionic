angular.module('mctrainer').controller('DetailsViewCtrl', function ($ionicModal, $scope, $state,$stateParams, ModuleData, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.title($stateParams.name);
    var questions = ModuleData.findByName($stateParams.name).questions;
    //TODO
    this.questions = questions;
    this.correct = questions.answers;
    

    //console.log(answers);
    //this.answers = answers;

    this.showQuestion = function(q){
        this.isCorrect = [];
        this.frage = q.question;
        this.answers = Object.keys(q.answers);

        for (var i = 0; i < this.answers.length; i++) {
            this.isCorrect[i] = q.answers[this.answers[i]];
        }

        $scope.modal.show();
    }

    $ionicModal.fromTemplateUrl('templates/ShowQuestionView.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
    }).then(function (modal) {
        $scope.modal = modal;
    });


});
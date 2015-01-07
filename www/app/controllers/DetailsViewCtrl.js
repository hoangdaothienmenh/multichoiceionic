angular.module('mctrainer').controller('DetailsViewCtrl', function ($timeout, $ionicModal, $scope, $state, $stateParams, ModuleData, $ionicNavBarDelegate) {
    $timeout(function () {
        $ionicNavBarDelegate.title($stateParams.name);
    }, 500);
    var module = ModuleData.findByName($stateParams.name);
    var stats = ModuleData.getStatsForModule(module.moduleID);
    var questions = module.questions;
    var moduleID = ModuleData.findByName($stateParams.name).moduleID;
    console.log(stats);
    this.questions = questions;
    this.correct = questions.answers;

    this.showQuestion = function (q) {
        this.isCorrect = [];
        this.question = q.question;
        this.answers = Object.keys(q.answers);
        for (var i = 0; i < this.answers.length; i++) {
            this.isCorrect[i] = q.answers[this.answers[i]];
        }
        $scope.modalQuestion.show();
    };

    this.showStats = function () {
        var questionsMastered = 0;

        for (var i = 0; i < stats.questions.length; i++) {
            if (stats.questions[i] == 6)
                questionsMastered++;
        }
        $scope.allStats = [{
            value: stats.questions_answered - stats.correct_answers, color: "#F7464A",
            highlight: "#FF5A5E", label: "Falsch"
        },
            {value: stats.correct_answers, color: "#46BFBD", highlight: "#5AD3D1", label: "Richtig"}];
        $scope.counterStats = [{
            value: stats.questions.length - questionsMastered, color: "#F7464A",
            highlight: "#FF5A5E"
        },
            {value: questionsMastered, color: "#46BFBD", highlight: "#5AD3D1", label: "Gemeistert"}];
        $scope.options = [{
            responsive: true,
            showTooltips: true
        }];
        $scope.modalStats.show();
    };

    this.resetStats = function () {
        ModuleData.resetStats(false, moduleID);
    };

    $ionicModal.fromTemplateUrl('templates/ShowQuestionModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalQuestion = modal;
    });

    $ionicModal.fromTemplateUrl('templates/ChartStatsModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalStats = modal;
    });


});
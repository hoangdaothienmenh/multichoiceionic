angular.module('mctrainer').controller('DetailsViewCtrl', function ($timeout, $ionicPopup, $ionicModal, $scope, $state, $stateParams, ModuleData, $ionicNavBarDelegate) {
    $timeout(function () {
        $ionicNavBarDelegate.title($stateParams.name);
    }, 500);
    var module = ModuleData.findByName($stateParams.name);
    var stats = ModuleData.getStatsForModule(module.moduleID);
    var questions = module.questions;
    var moduleID = ModuleData.findByName($stateParams.name).moduleID;
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
        var maxCounter = 6;
        if (stats.questions_answered == 0) {
            $ionicPopup.alert({ // Benutzer hinweisen - Alle Zähler zurücksetzen
                title: 'Keine Fragen beantwortet!',
                template: 'Bitte beantworte erst einige Fragen im Lernmodus um eine Statistik zu haben.'
            });
        } else {
            for (var i = 0; i < stats.questions.length; i++) {
                if (stats.questions[i] >= maxCounter)
                    questionsMastered++;
            }

            $scope.allStats = [{
                value: stats.questions_answered - stats.correct_answers,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "Falsch"
            },
                {value: stats.correct_answers, color: "#46BFBD", highlight: "#5AD3D1", label: "Richtig"}];

            if (questionsMastered == 0) {
                $scope.counterStats = [{
                    value: stats.questions.length,
                    color: "#85898C",
                    highlight: "#A9ADAA",
                    label: "Ungemeistert"
                }];
            } else {
                $scope.counterStats = [{
                    value: stats.questions.length - questionsMastered,
                    color: "#85898C",
                    highlight: "#A9ADAA"
                }, {value: questionsMastered, color: "#46BFBD", highlight: "#5AD3D1", label: "Gemeistert "}];
            }
            $scope.modalStats.show();
        }
    };

    this.resetStats = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Zurücksetzen?',
            template: 'Sind Sie sich sicher, dass Sie die Statistik zurücksetzen wollen?'
        });
        confirmPopup.then(function (res) {
            if (res) {
                ModuleData.resetStats(false, moduleID);
            }
            $scope.modalStats.hide();
        });
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
angular.module('mctrainer').controller('QuestionViewCtrl', function ($scope, $stateParams, $ionicPopup, $state, $ionicNavBarDelegate, ModuleData) {
    $ionicNavBarDelegate.setTitle($stateParams.name);
    var questions = ModuleData.findByName($stateParams.name);
    this.question = questions.questions[0].question;
    this.answers = questions.questions[0].answers;
    var key = questions.questions[0].keyAnswer;
    this.isAnswered = false;
    this.answered = {};
    var isCorrect = false;

    // Checkboxwerte auf false initialisieren
    for (var i = 0; i < this.answers.length; i++) {
        this.answered[i] = false;
    }

    this.showStats = function () {
        $ionicPopup.alert({
            title: 'Wollen sie die Leistung wirklich löschen?',
            template: 'Anzahl der beantworteten Fragen: ' + '<br>' +
            'Richtig beantwortet: ' + '<br>' +
            'Quote: '
        }).then(function () {
            $ionicNavBarDelegate.back();
        });
    };

    this.check = function () {
        var stop = true, i = 0;
        this.isAnswered = true;


        while (stop) {   // prüft ob Eingabe dem Lösungsschlüssel übereinstimmt
            if (key[i] != this.answered[i]) {
                stop = false;
                isCorrect = false;
            } else {
                isCorrect = true;
            }
            if (i == key.length) {
                stop = false;
            }
            i++;
        }

        if (isCorrect) {

        } else {

        }
    }
});
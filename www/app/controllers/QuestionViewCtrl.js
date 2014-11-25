angular.module('mctrainer').controller('QuestionViewCtrl', function ($scope, $stateParams, $ionicPopup, $state, $ionicNavBarDelegate, ModuleData) {
    $ionicNavBarDelegate.setTitle($stateParams.name);
    var questions = ModuleData.findByName($stateParams.name);

    // Bildet Zufallszahl aus der Länge der Fragen
    var randomIndex = Math.round(Math.random(questions.length));
    this.question = questions.questions[randomIndex].question;
    this.answers = questions.questions[randomIndex].answers;
    var key = questions.questions[randomIndex].keyAnswer;
    this.checked = {};
    this.isAnswered = false;
    this.answered = {};
    this.isCorrect = key;
    var answeredCorrect = false;


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
        var stop = true;
        var tempCorrect = false;

        for (var i = 0;i < key.length;i++){
            if (this.answered[i]){
                this.checked[i]= true;
            }else if (key[i]){
                this.checked[i] = true;
            }else{
                this.checked[i] = false;
            }
        }
        this.isAnswered = true;
        for (var i = 0 ; i< key.length;i++){ // prüft ob Eingabe dem Lösungsschlüssel übereinstimmt
            if (key[i] != this.answered[i]){
                tempCorrect = false;
                break;
            }else{
                tempCorrect = true;
            }
        }
        answeredCorrect = tempCorrect; //setzt Haken bei den richtigen Antworten
        console.log(answeredCorrect);
        console.log(this.checked);
        if (answeredCorrect) {
            //TODO
        } else {
            //TODO
        }
    };

    this.nextQuestion = function () {
        $state.go($state.current, {name: $stateParams.name}, {reload: true});
    }

});
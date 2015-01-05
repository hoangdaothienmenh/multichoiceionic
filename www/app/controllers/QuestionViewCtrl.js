angular.module('mctrainer').controller('QuestionViewCtrl', function ($scope, $stateParams, $ionicPopup, $state, $ionicNavBarDelegate, ModuleData) {
    $ionicNavBarDelegate.title($stateParams.name);
    var module = ModuleData.findByName($stateParams.name); // Objekt der Fragen mit deren Antworten.

    // Bildet Zufallszahl aus der Länge der Fragen
    var randomIndex = Math.round(Math.random(module.questions.length));

    this.question = module.questions[randomIndex].question;  // Anzeige der Frage
    this.answers = Object.keys(module.questions[randomIndex].answers); //Array der Antworten
    this.checked = {};  // Var zum Setzen der Haken der Checkboxen
    this.isAnswered = false; // Var für Status ob Frage beantwortet wurde oder nicht.
    this.answered = {}; // Var für die Antworten des Benutzers
    var initKeyAnswer = module.questions[randomIndex].answers; // Antworten als anwort:boolean
    this.isCorrect = []; // Array der richtigen Antworten als boolean
    var answeredCorrect = false; // Var ob richtig geantwortet wurde.

    // (Checkboxwerte auf false/ Lösungschlüssel)  initialisieren -------
    for (var i = 0; i < this.answers.length; i++) {
        this.answered[i] = false;
        this.isCorrect[i] = initKeyAnswer[this.answers[i]];
    }
    //-------------------------------------------------------------------

    // zeigt Stats an, wird am Ende oder bei vorzeitigem Beenden aufgerufen.
    this.showStats = function () {
        $ionicPopup.alert({
            title: 'Statistik dieser Lernrunde',
            template: 'Anzahl der beantworteten Fragen: ' + '<br>' +
            'Richtig beantwortet: ' + '<br>' +
            'Quote: '
        }).then(function () {
            $ionicNavBarDelegate.back();
        });
    };

    this.check = function () {
        var tempCorrect = false;
        this.isAnswered = true;

        for (var i = 0; i < this.answers.length; i++) {
            if (this.answered[i]){
                this.checked[i]= true;
            } else if (this.isCorrect[i]) {
                this.checked[i] = true;
            }else{
                this.checked[i] = false;
            }
        }


        for (i = 0; i < this.answers.length; i++) { // prüft ob Eingabe dem Lösungsschlüssel übereinstimmt
            if (this.isCorrect[i] != this.answered[i]) {
                tempCorrect = false;
                break;
            }else{
                tempCorrect = true;
            }
        }
        answeredCorrect = tempCorrect; //setzt Haken bei den richtigen Antworten

        if (answeredCorrect) {
            //TODO
        } else {
            //TODO
        }
    };

    this.nextQuestion = function () { // Funktion die nach dem Prüfen per Button zur nächsten Frage wechselt
        $state.go($state.current, {name: $stateParams.name}, {reload: true});
    }

});
angular.module('mctrainer').controller('QuestionViewCtrl', function ($scope, $timeout, $ionicHistory, $stateParams, $ionicPopup, $state, $ionicNavBarDelegate, ModuleData) {
    $timeout(function () {
        $ionicNavBarDelegate.title($stateParams.name);
    }, 600);

    function shuffle(array) { // Funktion zum mischen der Antworten
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    var module = ModuleData.findByName($stateParams.name); // Objekt der Fragen mit deren Antworten.

    // Bildet Zufallszahl aus der Länge der Fragen
    var index = 0;

    this.question = module.questions[index].question;  // Anzeige der Frage

    this.answers = shuffle(Object.keys(module.questions[index].answers)); //Array der Antworten
    this.checked = {};  // Var zum Setzen der Haken der Checkboxen
    this.isAnswered = false; // Var für Status ob Frage beantwortet wurde oder nicht.
    this.answered = {}; // Var für die Antworten des Benutzers
    var initKeyAnswer = module.questions[index].answers; // Antworten als anwort:boolean
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
            $ionicHistory.goBack();
        });
    };

    this.check = function () {
        var tempCorrect = false;
        this.isAnswered = true;

        for (var i = 0; i < this.answers.length; i++) {
            if (this.answered[i]) {
                this.checked[i] = true;
            } else if (this.isCorrect[i]) {
                this.checked[i] = true;
            } else {
                this.checked[i] = false;
            }
        }


        for (i = 0; i < this.answers.length; i++) { // prüft ob Eingabe dem Lösungsschlüssel übereinstimmt
            if (this.isCorrect[i] != this.answered[i]) {
                tempCorrect = false;
                break;
            } else {
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
    var that = this;
    this.nextQuestion = function () { // Funktion die nach dem Prüfen per Button zur nächsten Frage wechselt

        if (index == module.questions.length-1) {
            $ionicPopup.alert({
                title: 'Statistik dieser Lernrunde',
                template: 'Anzahl der beantworteten Fragen: ' + '<br>' +
                'Richtig beantwortet: ' + '<br>' +
                'Quote: '
            }).then(function () {
                $ionicHistory.goBack();
            });
        } else {
            index++;
            that.question = module.questions[index].question;  // Anzeige der Frage
            that.answers = Object.keys(module.questions[index].answers); //Array der Antworten
            that.checked = {};  // Var zum Setzen der Haken der Checkboxen
            that.isAnswered = false; // Var für Status ob Frage beantwortet wurde oder nicht.
            initKeyAnswer = module.questions[index].answers; // Antworten als anwort:boolean
            answeredCorrect = false; // Var ob richtig geantwortet wurde.

            // (Checkboxwerte auf false/ Lösungschlüssel)  initialisieren -------
            for (var i = 0; i < that.answers.length; i++) {
                that.answered[i] = false;
                that.isCorrect[i] = initKeyAnswer[that.answers[i]];
            }
        }
    }

});
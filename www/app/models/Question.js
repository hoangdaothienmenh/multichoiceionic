angular.module('mctrainer').factory('Question',
    function () {

        var Question = function (question, answers, keyAnswer) {
            this.question = question; //Frage
            this.answers = answers; //Antworten
            this.keyAnswer = keyAnswer; //Lösungsschlüssel
        };
        return Question;
    });
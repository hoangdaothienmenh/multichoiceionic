angular.module('mctrainer').factory('Question',
    function () {

        var Question = function (question, answers, rightAnswer) {
            this.question = question;
            this.answers = answers;
            this.rightAnswer = rightAnswer;
        };
        return Question;
    });
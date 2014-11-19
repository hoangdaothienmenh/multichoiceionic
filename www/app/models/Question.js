angular.module('mctrainer').factory('Question',
    function () {

        var Question = function (question, answers) {
            this.question = question;
            this.answers = answers;
        };
        return Question;
    });
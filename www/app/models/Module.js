angular.module('mctrainer').factory('Module',
    function () {

        var Module = function (name, questions) {
            this.name = name;
            this.questions = questions;
        };
        return Module;
    });
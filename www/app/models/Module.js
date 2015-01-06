angular.module('mctrainer').factory('Module',
    function () {

        var Module = function (name, questions) {
            this.name = name;
            this.questions = questions;
            this.moduleID = 0;
        };
        return Module;
    });
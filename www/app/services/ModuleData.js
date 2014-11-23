angular.module('mctrainer').service('ModuleData',
    function (Module, Question) {

        this.findAll = function () {
            var modules = localStorage.getItem('modules');
            var questions = [];
            var answers = [];
            var key = [];
            if (!modules) {
                modules = [];
                // add some test data
                answers.push("Angelo Merte");
                answers.push("Angela Merkel");
                answers.push("Angelino Mertes");
                answers.push("Gerhard Schröder");
                key.push(false, true, false, true);
                questions.push(new Question('Wer war jemals Bundeskanzler/in?', answers, key));
                key.push(true, false, true, false);
                questions.push(new Question('Wer war kein Bundeskanzler/in?', answers, key));
                modules.push(new Module('Ausbildereignung', questions));
                modules.push(new Module('Führerschein', questions));
                modules.push(new Module('Klausurvorbereitung', questions));
                modules.push(new Module('Allgemeinwissen', questions));
                localStorage.setItem('modules', JSON.stringify(modules));
            } else {
                modules = JSON.parse(modules);
            }
            return modules;
        };

        this.findByName = function (name) {
            var modules = this.findAll();
            var question;

            modules.forEach(function (ele) {

                if (ele.name == name) {
                    question = ele;
                }
            });
            return question;
        }
    });
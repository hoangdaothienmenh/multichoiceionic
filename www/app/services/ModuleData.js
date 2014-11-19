angular.module('mctrainer').service('ModuleData',
    function (Module, Question) {

        this.findAll = function () {
            var modules = localStorage.getItem('modules');
            var questions = [];
            var answers = [];
            if (!modules) {
                modules = [];
                // add some test data
                answers.push("166cm");
                answers.push("176cm");
                answers.push("186cm");
                answers.push("196cm");
                questions.push(new Question('Wie groß du?', answers));
                questions.push(new Question('Wie klein du?', answers));
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
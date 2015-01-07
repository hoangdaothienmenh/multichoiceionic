angular.module('mctrainer').service('ModuleData',
    function ($firebase, FIREBASE_URL) {

        var rootRef = new Firebase(FIREBASE_URL);
        var usersRef = rootRef.child('users');
        var modulesRef = rootRef.child('modules');
        var modules = $firebase(modulesRef).$asArray();
        var usersRefAngular = $firebase(usersRef);
        //var allUsers = $firebase(usersRef).$asArray();
        var userID = localStorage.getItem('userid');
        var userModules;
        var userStatistics;

        if (!userID) { // Falls keine ID im localstorage vorhanden wird eine erstellt und gesetzt.
            userID = new Date().getTime() + "-" + Math.floor(Math.random() * 1000000000000);
            localStorage.setItem('userid', userID);
            initUser().then(function () {
                initData();
            });
        } else {
            initData();
        }

        function initData() {
            userModules = $firebase(usersRef.child(userID).child("modules")).$asArray();
            userStatistics = $firebase(usersRef.child(userID).child("statistic")).$asArray();
        }

        /**
         * Falls die UserID noch nicht im Localstorage vorhanden ist, wird diese hier initialisiert.
         */
        function initUser() {
            var data = {modules: '', statistic: ''};
            return usersRefAngular.$set(userID, data);
        }

        this.getModules = function () { // holt die Module die angeboten wurden.
            return modules;
        };

        this.getUserModules = function () { // holt die Module die der Benutzer ausgewählt hat.
            return userModules;
        };

        this.addModuleToUser = function (module) { // Fügt ausgewähltes Modul zum Benutzerkatalog hinzu.
            userModules.$add(module).then(function () {
                var questionid = module.questions;
                for (var i = 0; i < module.questions.length; i++) {
                    questionid[i] = 0;
                }
                userStatistics.$add({
                    moduleID: module.$id,
                    questions_answered: 0,
                    correct_answers: 0,
                    questions: questionid
                });
            });
        };

        /*
         this.getModulesById = function (id) {
         return this.getModules().$getRecord(id);
         };
         */

        this.removeModule = function (id) { // entfernt ein Module vom User
            var item = null;
            userModules.forEach(function (el) {
                if (el.$id == id) {
                    item = userModules.$getRecord(el.$id);
                }
            });
            userModules.$remove(item);
        };

        this.findByName = function (name) {
            var modules = this.getUserModules();
            var module = "";

            modules.forEach(function (ele) {

                if (ele.name == name) {
                    module = ele;
                }
            });
            return module;
        };

        this.questionAnswered = function (moduleID, answerCorrect, questionID) {
            userStatistics.forEach(function (el) {
                if (el.moduleID == moduleID) {
                    var item = userStatistics.$getRecord(el.$id);
                    item.questions_answered += 1;
                    if (answerCorrect) {
                        item.correct_answers += 1;
                        item.questions[questionID] += 1;
                    } else {
                        item.questions[questionID] = 0;
                    }
                    userStatistics.$save(item);
                }
            });
        };

        this.getStatsForModule = function (moduleID) {
            var item = null;
            userStatistics.forEach(function (el) {
                if (el.moduleID == moduleID) {
                    item = userStatistics.$getRecord(el.$id);
                }
            });
            return item;
        };

        // setzt die Statistik für das Modul zurück, falls Flag counterOnly gesetzt
        // wird nur der Zähler für die einzelnen Fragen zurückgesetzt.
        this.resetStats = function (counterOnly, moduleID) {
            var item = null;
            userStatistics.forEach(function (el) {
                if (el.moduleID == moduleID) {
                    item = userStatistics.$getRecord(el.$id);
                }
            });

            var questionid = item.questions;
            for (var i = 0; i < item.questions.length; i++) {
                questionid[i] = 0;
            }
            if (!counterOnly) {
                item.correct_answers = 0;
                item.questions_answered = 0;
            }
            userStatistics.$save(item);
        };
    });

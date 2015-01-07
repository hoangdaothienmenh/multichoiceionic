angular.module('mctrainer').service('ModuleData',
    function ($firebase, FIREBASE_URL) {

        var rootRef = new Firebase(FIREBASE_URL);
        var usersRef = rootRef.child('users');
        var modulesRef = rootRef.child('modules');
        var modules = $firebase(modulesRef).$asArray();
        var usersRefAngular = $firebase(usersRef);
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

        /**
         * Initialisiert die Benutzerdaten
         */
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

        /**
         * Array mit den Modulen, die angeboten werden
         */
        this.getModules = function () {
            return modules;
        };

        /**
         * Array mit den Modulen, die der Benutzer ausgewählt hat
         * @returns {*}
         */
        this.getUserModules = function () {
            return userModules;
        };

        /**
         * Fügt das ausgewählte Modul zum Benutzerkatalog hinzu
         * @param module
         */
        this.addModuleToUser = function (module) {
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

        /**
         * Entfernt ein Module vom User
         */
        this.removeModule = function (id) { //
            var item = null;
            userModules.forEach(function (el) {
                if (el.$id == id) {
                    item = userModules.$getRecord(el.$id);
                }
            });
            userModules.$remove(item);
        };

        /**
         * Ein Modul anhand des Namens finden
         *
         * @param name Name des Moduls
         */
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

        /**
         * Aktualisiert die Benutzerstatistik. Wird nach jeder beantworteten Frage aufgerufen.
         *
         * @param moduleID
         * @param answerCorrect Ob die Antwort richtig war
         * @param questionID Die ID der Frage
         */
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

        /**
         * Liefert die Statistiken zu einem bestimmten Modul.
         */
        this.getStatsForModule = function (moduleID) {
            var item = null;
            userStatistics.forEach(function (el) {
                if (el.moduleID == moduleID) {
                    item = userStatistics.$getRecord(el.$id);
                }
            });
            return item;
        };

        /**
         * Setzt die Statistik für das Modul zurück
         *
         * @param counterOnly Nur den Zähler für die einzelnen Fragen zurücksetzen
         */
        this.resetStats = function(counterOnly, moduleID) {
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

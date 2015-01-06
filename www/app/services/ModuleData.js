angular.module('mctrainer').service('ModuleData',
    function ($firebase, FIREBASE_URL, Module, Question) {

        var rootRef = new Firebase(FIREBASE_URL);
        var usersRef = rootRef.child('users');
        var modulesRef = rootRef.child('modules');
        var rootRefAngular = $firebase(rootRef);
        var modulesRefAngular = $firebase(modulesRef);
        var usersRefAngular = $firebase(usersRef);
        var id = localStorage.getItem('userid');
        var userModulesRef;

        if (!id) { // Falls keine ID im localstorage vorhanden wird eine erstellt und gesetzt.
            var d = new Date();
            id = d.getTime() + "-" + Math.floor(Math.random() * 1000000000000);
            localStorage.setItem('userid', id);
            initUser();
        } else {
            userModulesRef = $firebase(usersRef.child(id).child("modules"));
        }


        function initUser() { // falls ID noch nicht in Datenbank vorhanden, wird diese hier initialisiert.
            var data = {modules: "empty", statistic: "empty"};
            usersRefAngular.$set(id, data).then(function (ref) {
                userModulesRef = $firebase(usersRef.child(id).child("modules"));
            }, function (error) {
                console.log("Error:", error);
            });
        }

        this.getModules = function () { // holt die Module die Angeboten wurden.
            return modulesRefAngular.$asArray();
        };

        this.getUserModules = function () { // holt die Module die der Benutzer ausgewählt hat.
            return userModulesRef.$asArray();
        };

        this.addModuleToUser = function (module) { // Fügt ausgewähltes Modul zum Benutzerkatalog hinzu.
            userModulesRef.$asArray().$add(module);
        };

        /*
         this.getModulesById = function (id) {
         return this.getModules().$getRecord(id);
         };
         */

        this.removeModule = function (id) { // entfernt ein Module vom User
            var modules = this.getUserModules();
            modules.$remove(modules.$getRecord(id));
        };

        this.findByName = function (name) { //
            var modules = this.getUserModules();
            var question;

            modules.forEach(function (ele) {

                if (ele.name == name) {
                    question = ele;
                }
            });
            return question;
        }
    });
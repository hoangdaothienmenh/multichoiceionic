angular.module('mctrainer').controller('QuestionViewCtrl', function ($scope, $stateParams, $state, $ionicNavBarDelegate, ModuleData) {
    $ionicNavBarDelegate.setTitle($stateParams.name);
    var questions = ModuleData.findByName($stateParams.name);
    this.question = questions.questions[0].question;
    this.answers = questions.questions[0].answers;

});
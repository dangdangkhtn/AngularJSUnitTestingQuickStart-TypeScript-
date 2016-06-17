var Experiments = (function () {
    function Experiments($http) {
        this.httpService = $http;
    }
    ;
    Experiments.prototype.getExperiments = function () {
        return this.httpService.get('data/experiments.json');
    };
    ;
    return Experiments;
}());
;
var ExperimentsCtrl = (function () {
    function ExperimentsCtrl(Messages, Experiments) {
        var _this = this;
        this.title = 'Experiments Page';
        this.body = 'This is the about page body';
        this.message = Messages.getMessage();
        //this.experiments = [
        //    { name: "Experiment 1", description: "This is an experiment", completed: 0 },
        //    { name: "Experiment 2", description: "This is an experiment", completed: 0 },
        //    { name: "Experiment 3", description: "This is an experiment", completed: 0 },
        //    { name: "Experiment 4", description: "This is an experiment", completed: 0 }
        //]
        Experiments.getExperiments()
            .then(function (result) { _this.experiments = result.data; });
        this.updateMessage = function (m) {
            Messages.setMessage(m);
        };
    }
    ExperimentsCtrl.prototype.updateMessage = function (m) { };
    ;
    ;
    return ExperimentsCtrl;
}());
;
var CustomDirectiveController = (function () {
    function CustomDirectiveController($scope) {
        this.$scope = $scope;
        this.completed = 0;
        $scope.doExperiment = function () {
            $scope.$apply(function () {
                $scope.experiment.completed++;
            });
        };
    }
    ;
    CustomDirectiveController.$inject = ['$scope'];
    return CustomDirectiveController;
}());
var linker = function (scope, element, attattrs) {
    element.on('click', function () {
        scope.doExperiment();
    });
};
angular.module('myApp.experiments', [
    'ui.router',
    'myApp.models.messages'
])
    .config(function ($stateProvider) {
    $stateProvider
        .state('experiments', {
        url: '/experiments',
        templateUrl: 'app/experiments/experiments.tmpl.html',
        controller: 'ExperimentsCtrl as experiments'
    });
})
    .controller('ExperimentsCtrl', ['Messages', 'Experiments', ExperimentsCtrl])
    .service('Experiments', Experiments)
    .directive('experiment', function () {
    return {
        scope: true,
        restrict: 'E',
        template: '<div class="experiment">' +
            '<h3>{{experiment.name}}</h3>' +
            '<p>{{experiment.description}}</p>' +
            '<p><strong>{{experiment.completed}}</strong></p>' +
            '</div>',
        link: linker,
        controller: CustomDirectiveController
    };
});
//# sourceMappingURL=experiments.js.map
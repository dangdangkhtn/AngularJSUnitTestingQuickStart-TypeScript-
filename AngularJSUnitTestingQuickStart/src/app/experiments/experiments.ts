interface IExperiment {
    name: string;
    description: string;
    completed: string;
}

class Experiments {
    httpService: ng.IHttpService;
    constructor($http: ng.IHttpService) {
        this.httpService = $http;
    };
    getExperiments() {
        return this.httpService.get('data/experiments.json');
    };
};

class ExperimentsCtrl {

    title = 'Experiments Page';
    body = 'This is the about page body';
    message: string;
    experiments: any;

    updateMessage(m: string) { };
    abstract: string;
    constructor(Messages: Messages, Experiments: Experiments) {
        
        this.message = Messages.getMessage();
        //this.experiments = [
        //    { name: "Experiment 1", description: "This is an experiment", completed: 0 },
        //    { name: "Experiment 2", description: "This is an experiment", completed: 0 },
        //    { name: "Experiment 3", description: "This is an experiment", completed: 0 },
        //    { name: "Experiment 4", description: "This is an experiment", completed: 0 }
        //]

        Experiments.getExperiments()
            .then((result) => {  this.experiments = result.data; })
        this.updateMessage = function (m: string) {
            Messages.setMessage(m);           
        };
    };
};


interface IExperimentsScope extends ng.IScope {
    doExperiment: () => void;
    experiment: any;
}  

class CustomDirectiveController {
    static $inject: string[] = ['$scope'];
    completed: number = 0;
    constructor(public $scope: IExperimentsScope) {    
        $scope.doExperiment = function () {
            $scope.$apply(function () {
                $scope.experiment.completed++;
            });
        }
    };    
}

var linker = function (scope: IExperimentsScope, element: JQuery, attattrs: any) {
    element.on('click', function () {
        scope.doExperiment();
    })
};

angular.module('myApp.experiments', [
    'ui.router',
    'myApp.models.messages'
])
    .config(function ($stateProvider: angular.ui.IStateProvider) {
        $stateProvider
            .state('experiments', {
                url: '/experiments',
                templateUrl: 'app/experiments/experiments.tmpl.html',
                controller: 'ExperimentsCtrl as experiments'
            })
            ;
    })
    .controller('ExperimentsCtrl', ['Messages','Experiments',ExperimentsCtrl])
    .service('Experiments', Experiments)
    .directive('experiment', () => {
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
        }
    })
    ;
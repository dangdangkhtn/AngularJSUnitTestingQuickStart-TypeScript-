/// <reference path="../common/models/messages-model.ts" />
class HomeCtrl {
    private title = 'Home Page';
    private body = 'This is the about home body';
    private message: string;
    constructor(private messagesService: Messages) {
        this.message = messagesService.getMessage();
    };
    updateMessage(m: string) {
        this.messagesService.setMessage(m);
    };
};
angular.module('myApp.home', [
    'ui.router',
    'myApp.models.messages'
])
    .config(function ($stateProvider: angular.ui.IStateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/home.tmpl.html',
                controller: 'HomeCtrl as home'
                /** This mean publish controller instance into a scope property named "home",
                * Then we have $scope.home
                * And in template, we can access attribute of controller by this syntax "home.<att>"
                * Note: Because we push the controller instance into a scope property directly,
                * We don't need to inject $scope any more
                * This is the 1st coding style ref from: https://docs.angularjs.org/api/ng/directive/ngController
                */
            })
            ;
    })
    .controller('HomeCtrl', ['Messages', HomeCtrl]);
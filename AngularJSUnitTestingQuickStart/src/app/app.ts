angular.module('myApp', [
    'ui.router',
    'myApp.models.messages',
    'myApp.about',
    'myApp.experiments',
    'myApp.home'
])
    .config(function ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
        $stateProvider.state('app', {  abstract: true });
        $urlRouterProvider.otherwise('/home');
    });
/// <reference path="../common/models/messages-model.ts" />
var HomeCtrl = (function () {
    function HomeCtrl(messagesService) {
        this.messagesService = messagesService;
        this.title = 'Home Page';
        this.body = 'This is the about home body';
        this.message = messagesService.getMessage();
    }
    ;
    HomeCtrl.prototype.updateMessage = function (m) {
        this.messagesService.setMessage(m);
    };
    ;
    return HomeCtrl;
}());
;
angular.module('myApp.home', [
    'ui.router',
    'myApp.models.messages'
])
    .config(function ($stateProvider) {
    $stateProvider
        .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.tmpl.html',
        controller: 'HomeCtrl as home'
    });
})
    .controller('HomeCtrl', ['Messages', HomeCtrl]);
//# sourceMappingURL=home.js.map
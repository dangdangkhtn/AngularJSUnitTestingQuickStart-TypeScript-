/// <reference path="../common/models/messages-model.ts" />
class AboutCtrl {
    title = 'About Page';
    body = 'This is the about page body';
    message: string;
    constructor(private messagesService: Messages) {
        this.message = messagesService.getMessage();
    }
    updateMessage(m: string) {
        this.messagesService.setMessage(m);
    }
};
angular.module('myApp.about', [
    'ui.router',
    'myApp.models.messages'
])
    .config(function ($stateProvider: angular.ui.IStateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                templateUrl: 'app/about/about.tmpl.html',
                controller: 'AboutCtrl as about'
            })
            ;
    })
    .controller('AboutCtrl', ['Messages', AboutCtrl]);
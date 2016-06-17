/// <reference path="../common/models/messages-model.ts" />
var AboutCtrl = (function () {
    function AboutCtrl(messagesService) {
        this.messagesService = messagesService;
        this.title = 'About Page';
        this.body = 'This is the about page body';
        this.message = messagesService.getMessage();
    }
    AboutCtrl.prototype.updateMessage = function (m) {
        this.messagesService.setMessage(m);
    };
    return AboutCtrl;
}());
;
angular.module('myApp.about', [
    'ui.router',
    'myApp.models.messages'
])
    .config(function ($stateProvider) {
    $stateProvider
        .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.tmpl.html',
        controller: 'AboutCtrl as about'
    });
})
    .controller('AboutCtrl', ['Messages', AboutCtrl]);
//# sourceMappingURL=about.js.map
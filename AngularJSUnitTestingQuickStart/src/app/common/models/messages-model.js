var Messages = (function () {
    function Messages() {
        this.message = 'Hello Message';
        var message = 'Hello Message';
    }
    Messages.prototype.getMessage = function () {
        return this.message;
    };
    ;
    Messages.prototype.setMessage = function (m) {
        this.message = m;
    };
    ;
    return Messages;
}());
angular.module('myApp.models.messages', []).service('Messages', Messages);
//# sourceMappingURL=messages-model.js.map
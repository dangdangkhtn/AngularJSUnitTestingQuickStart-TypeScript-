class Messages {
    private message: string = 'Hello Message';
    constructor() {
        var message = 'Hello Message';
    }

    getMessage(): string {
        return this.message;
    };

    setMessage(m: string) {
        this.message = m;
    };
}

angular.module('myApp.models.messages', []).service('Messages', Messages);
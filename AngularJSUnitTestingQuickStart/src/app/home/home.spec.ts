function compileRouteTemplateWithController($injector: ng.auto.IInjectorService, state: string, controllerName: string) {
    var $rootScope = $injector.get('$rootScope');
    var $templateCache = $injector.get('$templateCache');
    var $compile = $injector.get('$compile');

    /** $injector.get doesn't have '$state' param, see angular.d.ts at line 1584
     *  because '$state' return from "angular-ui-router" library, which is not a original angularJS library
     *  So we should append to the statement 'as ng.ui.IStateService;'
     */

    var $state = $injector.get('$state') as ng.ui.IStateService; 
    var $controller = $injector.get('$controller');

    var scope = $rootScope.$new();
    var stateDetails = $state.get(state) as ng.ui.IState;
    var html = <string>$templateCache.get(<string>stateDetails.templateUrl);

    var ctrl = scope[state] = $controller(controllerName);
    $rootScope.$digest();
    var compileFn = $compile(angular.element('<div></div>').html(html));

    return {
        controller: ctrl,
        scope: scope,
        render: function () {
            var element = compileFn(scope);
            $rootScope.$digest();
            return element;
        }
    };
}


describe('Unit: Home', function () {
    var ctrl: HomeCtrl,
        Messages: Messages;

    beforeEach(angular.mock.module('myAppTemplates')); 
    // TODO: for non karma testing: http://stackoverflow.com/questions/15214760/unit-testing-angularjs-directive-with-templateurl
    // http://stackoverflow.com/questions/19313645/how-can-i-test-a-directive-using-templateurl-in-chutzpahs-headless-browser
    beforeEach(angular.mock.module('myApp.home'));
    beforeEach(angular.mock.module('myApp.models.messages'));
    beforeEach(angular.mock.module('ui.router'));

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('Messages', {
            message: 'Mock Message!',
            getMessage: function () {
                return this.message;
            },
            setMessage: function (m: string) {
                this.message = m;
            }
        });
    }));

    beforeEach(inject(function ($controller: ng.IControllerService, _Messages_: Messages) {
        Messages = _Messages_;

        spyOn(Messages, 'setMessage').and.callThrough();
        spyOn(Messages, 'getMessage').and.callThrough();
    }));

    describe('Home Route', function () {
        var $state: ng.ui.IStateService,
            $rootScope: ng.IScope,
            state = 'home';

        beforeEach(inject(function (_$state_: ng.ui.IStateService, $templateCache: ng.ITemplateCacheService, _$rootScope_: ng.IScope) {
            $state = _$state_;
            $rootScope = _$rootScope_;
        }));

        it('should respond to URL', function () {
            expect($state.href(state)).toEqual('#/home');
        });

        it('should activate the state', function () {
            $state.go(state);
            $rootScope.$digest();
            expect($state.current.name).toBe(state);
        });
    });

    describe('home page', function () {
        var element: JQuery;
        var render: Function;
        var ctrl: HomeCtrl;
        var scope: any; // TODO: define Home Controller Scope.

        beforeEach(inject(function ($injector: ng.auto.IInjectorService) {

            var routeDetails = compileRouteTemplateWithController($injector, 'home', 'HomeCtrl');
            ctrl = <HomeCtrl>routeDetails.controller;
            scope = routeDetails.scope;

            render = function () {
                element = routeDetails.render();
            };
        }));

        it('should render the page title', function () {
            scope.home.title = 'Hello';
            render();
            expect(element.find('h1').text()).toBe('Hello');
        });

        it('should have body defined', function () {
            scope.home.body = 'body...';
            render();
            expect(element.find('p').text()).toBe('body...');
        });

        it('should call Messages.getMessage', function () {
            render();
            expect(Messages.getMessage).toHaveBeenCalled();

            ctrl.updateMessage('yo!');
            expect(Messages.setMessage).toHaveBeenCalled();
        });

        it('should call Messages.setMessage when submit is clicked', function () {
            render();
            element.find('input').val('Lukas');
            element.find('input').triggerHandler('input');
            scope.$digest();

            element.find('button').triggerHandler('click');
            scope.$digest();

            expect(Messages.getMessage).toHaveBeenCalled();
            expect(scope.home.message).toEqual('Lukas');
        });

        it('should call updateMessage on message', function () {
            var message = 'Hello Message';

            ctrl.updateMessage(message);

            expect(Messages.setMessage).toHaveBeenCalledWith(message);
        });
    });
});

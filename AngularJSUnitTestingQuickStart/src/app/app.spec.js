// src/app/app.spec.js
// Containing describe block (or "suite"), usually named for an app feature.
// In this case the feature is the App itself.
describe('Unit: App', function () {
    // Include Modules
    beforeEach(angular.mock.module('myApp'));
    beforeEach(angular.mock.module('myApp.about'));
    //beforeEach(angular.mock.module('myApp.experiments'));
    beforeEach(angular.mock.module('myApp.home'));
    beforeEach(angular.mock.module('myApp.models.messages'));
    beforeEach(angular.mock.module('ui.router'));
    // Suite for testing an individual piece of our feature.
    describe('App Abstract Route', function () {
        // Instantiate global variables (global to all tests in this describe block).
        var $state, $rootScope, state = 'app';
        // Inject dependencies
        beforeEach(inject(function (_$state_, $templateCache, _$rootScope_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $templateCache.put('app/home/home.tmpl.html', '');
        }));
        // It block (or "spec") to test expectations for the
        // Expectations return true or false.
        it('verifies state configuration', function () {
            var config = $state.get(state);
            expect(config.abstract).toBeTruthy();
            expect(config.url).toBeUndefined();
        });
    });
});
//# sourceMappingURL=app.spec.js.map
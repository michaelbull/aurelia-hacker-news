import { App } from '../../src/app';
import { RouteConfig, RouterConfiguration } from 'aurelia-router';

class RouterConfigurationStub extends RouterConfiguration {
    title: string;
    routes: RouteConfig[] = Array<RouteConfig>();

    mapRoute(config: RouteConfig): RouterConfiguration {
        this.routes.push(config);
        return this;
    }
}

describe('App', () => {
    describe('configureRouter', () => {
        let testee: App;
        let config: RouterConfigurationStub;

        beforeEach(() => {
            config = new RouterConfigurationStub();

            testee = new App();
            testee.configureRouter(config, jasmine.createSpyObj('router', ['reset']));
        });

        it('should set the title to Aurelia HN', () => {
            expect(config.title).toBe('Aurelia HN');
        });
    });
});

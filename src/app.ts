import {
    EventAggregator,
    Subscription
} from 'aurelia-event-aggregator';
import {
    autoinject,
    ComponentAttached,
    ComponentDetached,
    PLATFORM
} from 'aurelia-framework';
import {
    ConfiguresRouter,
    RoutableComponentActivate,
    RoutableComponentDeactivate,
    Router,
    RouterConfiguration
} from 'aurelia-router';
import * as NProgress from 'nprogress';
import '../style/index.scss';
import { ScrollToTopStep } from './pipelines';

const MS_FOR_LOADER_BAR_TO_APPEAR = 50;

@autoinject()
export class App implements RoutableComponentActivate, RoutableComponentDeactivate, ConfiguresRouter, ComponentAttached, ComponentDetached {
    private readonly subscriptions: Subscription[] = [];

    private router!: Router;
    private readonly events: EventAggregator;

    constructor(events: EventAggregator) {
        this.events = events;
    }

    activate(): void {
        let processingSubscription = this.events.subscribe('router:navigation:processing', this.showLoaderBar);
        let completeSubscription = this.events.subscribe('router:navigation:complete', NProgress.done);

        this.subscriptions.push(processingSubscription, completeSubscription);
    }

    deactivate(): void {
        for (let subscription of this.subscriptions) {
            subscription.dispose();
        }
    }

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;

        config.title = 'Aurelia HN';
        config.addPostRenderStep(ScrollToTopStep);

        config.mapRoute({
            route: '',
            moduleId: PLATFORM.moduleName('./pages/top'),
            name: 'topstories'
        }).mapRoute({
            route: 'newest',
            moduleId: PLATFORM.moduleName('./pages/newest'),
            name: 'newstories',
            nav: true,
            title: 'New'
        }).mapRoute({
            route: 'best',
            moduleId: PLATFORM.moduleName('./pages/best'),
            name: 'beststories',
            nav: true,
            title: 'Best'
        }).mapRoute({
            route: 'show',
            moduleId: PLATFORM.moduleName('./pages/show'),
            name: 'showstories',
            nav: true,
            title: 'Show'
        }).mapRoute({
            route: 'ask',
            moduleId: PLATFORM.moduleName('./pages/ask'),
            name: 'askstories',
            nav: true,
            title: 'Ask'
        }).mapRoute({
            route: 'jobs',
            moduleId: PLATFORM.moduleName('./pages/jobs'),
            name: 'jobstories',
            nav: true,
            title: 'Jobs'
        }).mapRoute({
            route: 'item/:id',
            moduleId: PLATFORM.moduleName('./pages/item'),
            name: 'item'
        }).mapRoute({
            route: 'user/:id',
            moduleId: PLATFORM.moduleName('./pages/user'),
            name: 'user'
        }).mapUnknownRoutes({
            route: 'unknown',
            redirect: ''
        });
    }

    attached(): void {
        NProgress.configure({
            trickleSpeed: 100,
            template: `
              <div class="nprogress">
                <div class="nprogress__bar" role="bar">
                  <div class="nprogress__peg"></div>
                </div>
                <div class="nprogress__spinner" role="spinner">
                  <div class="nprogress__spinner-icon"></div>
                </div>
              </div>
            `
        });
    }

    detached(): void {
        NProgress.remove();
    }

    private showLoaderBar = (): void => {
        setTimeout(() => {
            if (this.router.isNavigating) {
                NProgress.start();
            }
        }, MS_FOR_LOADER_BAR_TO_APPEAR);
    };
}

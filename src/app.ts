import {
    EventAggregator,
    Subscription
} from 'aurelia-event-aggregator';
import {
    autoinject,
    ComponentAttached,
    PLATFORM
} from 'aurelia-framework';
import {
    RoutableComponentActivate,
    RoutableComponentDeactivate,
    Router,
    RouterConfiguration
} from 'aurelia-router';
import * as NProgress from 'nprogress';
import '../style/index.scss';
import { ScrollToTopStep } from './services/scroll-to-top-step';

const MS_FOR_LOADER_BAR_TO_APPEAR = 50;

@autoinject()
export class App implements RoutableComponentActivate, RoutableComponentDeactivate, ComponentAttached {
    private processingSubscription!: Subscription;
    private completeSubscription!: Subscription;
    private router!: Router;

    private readonly events: EventAggregator;

    constructor(events: EventAggregator) {
        this.events = events;
    }

    activate(): void {
        this.processingSubscription = this.events.subscribe('router:navigation:processing', this.showLoaderBar);
        this.completeSubscription = this.events.subscribe('router:navigation:complete', NProgress.done);
    }

    deactivate(): void {
        this.processingSubscription.dispose();
        this.completeSubscription.dispose();
    }

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;

        config.title = 'Aurelia HN';
        config.addPostRenderStep(ScrollToTopStep);

        config.mapRoute({
            route: '',
            moduleId: PLATFORM.moduleName('./pages/news'),
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

    private showLoaderBar = (): void => {
        setTimeout(() => {
            if (this.router.isNavigating) {
                NProgress.start();
            }
        }, MS_FOR_LOADER_BAR_TO_APPEAR);
    };
}

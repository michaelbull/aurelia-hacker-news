import {
    EventAggregator,
    Subscription
} from 'aurelia-event-aggregator';
import { autoinject, PLATFORM } from 'aurelia-framework';
import {
    Router,
    RouterConfiguration
} from 'aurelia-router';
import * as NProgress from 'nprogress';
import '../style/index.scss';

const MS_FOR_LOADER_BAR_TO_APPEAR: number = 50;

@autoinject()
export class App {
    private processingSubscription: Subscription;
    private completeSubscription: Subscription;
    private router: Router;

    private readonly events: EventAggregator;

    constructor(events: EventAggregator) {
        this.events = events;
    }

    activate(): void {
        this.processingSubscription = this.events.subscribe('router:navigation:processing', () => {
            setTimeout(() => {
                if (this.router.isNavigating) {
                    NProgress.start();
                }
            }, MS_FOR_LOADER_BAR_TO_APPEAR);
        });

        this.completeSubscription = this.events.subscribe('router:navigation:complete', () => {
            NProgress.done();
        });
    }

    deactivate(): void {
        this.processingSubscription.dispose();
        this.completeSubscription.dispose();
    }

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;

        config.title = 'Aurelia HN';

        config.mapRoute({
            route: '',
            redirect: 'news'
        }).mapRoute({
            route: 'news',
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
            route: '',
            redirect: 'news'
        });
    }
}

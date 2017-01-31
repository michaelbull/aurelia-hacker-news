import { inject } from 'aurelia-framework';
import {
    Router,
    RouterConfiguration
} from 'aurelia-router';
import {
    EventAggregator,
    Subscription
} from 'aurelia-event-aggregator';
import * as NProgress from 'nprogress';

const MS_FOR_LOADER_BAR_TO_APPEAR: number = 50;

@inject(EventAggregator)
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
            moduleId: './pages/news/index',
            name: 'topstories'
        }).mapRoute({
            route: 'newest',
            moduleId: './pages/newest/index',
            name: 'newstories',
            nav: true,
            title: 'New'
        }).mapRoute({
            route: 'best',
            moduleId: './pages/best/index',
            name: 'beststories',
            nav: true,
            title: 'Best'
        }).mapRoute({
            route: 'show',
            moduleId: './pages/show/index',
            name: 'showstories',
            nav: true,
            title: 'Show'
        }).mapRoute({
            route: 'ask',
            moduleId: './pages/ask/index',
            name: 'askstories',
            nav: true,
            title: 'Ask'
        }).mapRoute({
            route: 'jobs',
            moduleId: './pages/jobs/index',
            name: 'jobstories',
            nav: true,
            title: 'Jobs'
        }).mapRoute({
            route: 'item/:id',
            moduleId: './pages/item/index',
            name: 'item'
        }).mapRoute({
            route: 'user/:id',
            moduleId: './pages/user/index',
            name: 'user'
        }).mapUnknownRoutes({
            route: '',
            redirect: 'news'
        });
    }
}

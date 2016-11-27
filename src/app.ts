import { inject } from 'aurelia-framework';
import { Router, RouterConfiguration, NavModel } from 'aurelia-router';
import { HackerNewsApi } from './services/api';

@inject(HackerNewsApi)
export class App {
    private navigation: NavModel[];

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.navigation = router.navigation;

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
        }).mapUnknownRoutes('./pages/not-found');
    }
}

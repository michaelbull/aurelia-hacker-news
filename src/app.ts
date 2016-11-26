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
            route: 'item/:id',
            moduleId: './pages/item/index',
            name: 'item'
        }).mapUnknownRoutes('./pages/not-found');
    }
}

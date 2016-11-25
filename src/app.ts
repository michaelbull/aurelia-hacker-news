import { Router, RouterConfiguration, NavModel } from 'aurelia-router';

export class App {
    private navigation: NavModel[];

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.navigation = router.navigation;

        config.title = 'Hacker News';

        config.mapRoute({
            route: '',
            redirect: 'news'
        }).mapRoute({
            route: 'news',
            moduleId: './pages/news/index',
            nav: true
        }).mapUnknownRoutes('./pages/not-found');
    }
}

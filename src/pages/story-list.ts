import {
    RoutableComponentActivate,
    RoutableComponentDetermineActivationStrategy,
    Router
} from 'aurelia-router';
import {
    HackerNewsApi,
    STORIES_PER_PAGE
} from '../services/api';

export abstract class StoryList implements RoutableComponentActivate, RoutableComponentDetermineActivationStrategy {
    stories: any[];
    currentPage: number;
    totalPages: number;
    readonly route: string;

    protected readonly api: HackerNewsApi;
    protected readonly router: Router;
    private allStories: number[] = [];

    constructor(api: HackerNewsApi, router: Router, route: string) {
        this.api = api;
        this.router = router;
        this.route = route;
    }

    determineActivationStrategy(): 'no-change' | 'invoke-lifecycle' | 'replace' {
        return 'invoke-lifecycle';
    }

    async activate(params: any): Promise<void> {
        this.allStories = await this.api.fetch(this.route);
        this.currentPage = params.page ? Number(params.page) : 1;
        this.totalPages = Math.ceil(this.allStories.length / STORIES_PER_PAGE);

        if (this.currentPage > this.totalPages) {
            this.router.navigateToRoute(this.route, { page: this.totalPages });
        } else {
            this.stories = await this.api.fetchItemsOnPage(this.allStories, this.currentPage);
        }
    }
}

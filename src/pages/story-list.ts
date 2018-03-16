import {
    RoutableComponentActivate,
    RoutableComponentCanActivate,
    RoutableComponentDetermineActivationStrategy,
    Router
} from 'aurelia-router';
import { Item } from '../models/item';
import {
    HackerNewsApi,
    STORIES_PER_PAGE
} from '../services/api';

export abstract class StoryList implements RoutableComponentCanActivate, RoutableComponentActivate, RoutableComponentDetermineActivationStrategy {
    stories: Item[] = [];
    offset = 0;
    currentPage = 1;
    totalPages = 0;

    protected readonly api: HackerNewsApi;
    protected readonly router: Router;
    readonly route: string;

    constructor(api: HackerNewsApi, router: Router, route: string) {
        this.api = api;
        this.router = router;
        this.route = route;
    }

    determineActivationStrategy(): 'no-change' | 'invoke-lifecycle' | 'replace' {
        return 'replace';
    }

    canActivate(params: any): boolean {
        return params.page === undefined || !isNaN(params.page);
    }

    async activate(params: any): Promise<void> {
        if (params.page !== undefined) {
            this.currentPage = Number(params.page);
        }

        let allStories = await this.api.fetchItemIds(this.route);
        this.totalPages = Math.ceil(allStories.length / STORIES_PER_PAGE);

        if (this.currentPage > this.totalPages) {
            this.router.navigateToRoute(this.route, { page: this.totalPages });
        } else {
            this.stories = await this.api.fetchItemsOnPage(allStories, this.currentPage);
        }

        this.offset = STORIES_PER_PAGE * (this.currentPage - 1);
    }
}

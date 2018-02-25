import {
    RoutableComponentActivate,
    RoutableComponentDetermineActivationStrategy,
    Router
} from 'aurelia-router';
import { Item } from '../models/item';
import {
    HackerNewsApi,
    STORIES_PER_PAGE
} from '../services/api';

export abstract class StoryList implements RoutableComponentActivate, RoutableComponentDetermineActivationStrategy {
    stories: Item[] = [];
    offset!: number;
    currentPage!: number;
    totalPages!: number;
    readonly route: string;

    protected readonly api: HackerNewsApi;
    protected readonly router: Router;

    constructor(api: HackerNewsApi, router: Router, route: string) {
        this.api = api;
        this.router = router;
        this.route = route;
    }

    determineActivationStrategy(): 'no-change' | 'invoke-lifecycle' | 'replace' {
        return 'invoke-lifecycle';
    }

    async activate(params: any): Promise<void> {
        let allStories = await this.api.fetch(this.route);

        this.currentPage = params.page ? Number(params.page) : 1;
        this.totalPages = Math.ceil(allStories.length / STORIES_PER_PAGE);

        if (this.currentPage > this.totalPages) {
            this.router.navigateToRoute(this.route, { page: this.totalPages });
        } else {
            this.stories = await this.api.fetchItemsOnPage(allStories, this.currentPage);
        }

        this.offset = STORIES_PER_PAGE * (this.currentPage - 1);
    }
}

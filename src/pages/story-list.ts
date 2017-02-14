import { observable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {
    HackerNewsApi,
    STORIES_PER_PAGE
} from '../services/api';

export abstract class StoryList {
    stories: any[];
    offset: number;
    @observable() currentPage: number;
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

    determineActivationStrategy(): string {
        return 'replace';
    }

    async activate(params: any): Promise<void> {
        this.allStories = await this.api.fetch(this.route);
        this.totalPages = Math.ceil(this.allStories.length / STORIES_PER_PAGE);

        if (params.page === undefined || isNaN(params.page) || params.page < 1) {
            this.router.navigateToRoute(this.route, { page: 1 });
        } else if (params.page > this.totalPages) {
            this.router.navigateToRoute(this.route, { page: this.totalPages });
        } else {
            this.currentPage = Number(params.page);
            this.stories = await this.api.fetchItemsOnPage(this.allStories, this.currentPage);
        }

        window.scrollTo(0, 0);
    }

    currentPageChanged(newValue: number, oldValue: number): void {
        if (newValue !== oldValue) {
            this.offset = STORIES_PER_PAGE * (newValue - 1);
        }
    }
}

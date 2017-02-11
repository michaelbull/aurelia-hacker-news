import { observable } from 'aurelia-framework';
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
    private allStories: number[] = [];

    constructor(api: HackerNewsApi, route: string) {
        this.api = api;
        this.route = route;
    }

    determineActivationStrategy(): string {
        return 'replace';
    }

    async activate(params: any): Promise<void> {
        window.scrollTo(0, 0);

        if (params.page === undefined || isNaN(params.page) || params.page < 1) {
            this.currentPage = 1;
        } else {
            this.currentPage = Number(params.page);
        }

        this.allStories = await this.api.fetch(this.route);
        this.stories = await this.api.fetchItemsOnPage(this.allStories, this.currentPage);
        this.totalPages = Math.ceil(this.allStories.length / STORIES_PER_PAGE);
    }

    currentPageChanged(newValue: number, oldValue: number): void {
        if (newValue === oldValue) {
            return;
        }

        this.offset = STORIES_PER_PAGE * (newValue - 1);
    }
}

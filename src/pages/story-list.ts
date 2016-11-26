import { observable } from 'aurelia-framework';
import { activationStrategy } from 'aurelia-router';
import { HackerNewsApi, STORIES_PER_PAGE } from '../services/api';

export abstract class StoryList {
    @observable() private allStories: number[] = [];
    @observable() private currentPage: number;

    private totalPages: number;
    private stories: any[] = [];
    private offset: number;

    private readonly api: HackerNewsApi;
    private readonly path: string;

    constructor(api: HackerNewsApi, path: string) {
        this.api = api;
        this.path = path;
    }

    determineActivationStrategy(): string {
        // don't forcefully refresh the page, just invoke our activate method
        return activationStrategy.invokeLifecycle;
    }

    activate(params: any): Promise<void> {
        if (params.page === undefined || isNaN(params.page) || params.page < 1) {
            this.currentPage = 1;
        } else {
            this.currentPage = Number(params.page);
        }

        return this.api.fetchStories(this.path).then(
            (stories: number[]) => {
                this.allStories = stories;
            }
        );
    }

    allStoriesChanged(newValue: number[], oldValue: number[]): void {
        if (newValue === oldValue || this.api === undefined) {
            return;
        }

        this.api.fetchItemsOnPage(this.allStories, this.currentPage).then(
            (value: any) => {
                this.stories = value;
                this.totalPages = Math.ceil(this.allStories.length / STORIES_PER_PAGE);
            }
        );
    }

    currentPageChanged(newValue: number, oldValue: number): void {
        if (newValue === oldValue) {
            return;
        }

        this.offset = STORIES_PER_PAGE * (newValue - 1);
    }
}

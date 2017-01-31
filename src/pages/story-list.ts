import { observable } from 'aurelia-framework';
import { activationStrategy } from 'aurelia-router';
import {
    HackerNewsApi,
    STORIES_PER_PAGE
} from '../services/api';

export abstract class StoryList {
    readonly api: HackerNewsApi;

    @observable() private allStories: number[] = [];
    @observable() private currentPage: number;

    private totalPages: number;
    private stories: any[];
    private offset: number;

    constructor(api: HackerNewsApi) {
        this.api = api;
    }

    abstract fetchIds(): Promise<number[]>;

    determineActivationStrategy(): string {
        // don't forcefully refresh the page, just invoke our activate method
        return activationStrategy.invokeLifecycle;
    }

    activate(params: any): void {
        window.scrollTo(0, 0);

        if (params.page === undefined || isNaN(params.page) || params.page < 1) {
            this.currentPage = 1;
        } else {
            this.currentPage = Number(params.page);
        }

        this.fetchIds().then(
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

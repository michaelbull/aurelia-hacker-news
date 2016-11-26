import { inject, observable } from 'aurelia-framework';
import { HackerNewsApi, STORIES_PER_PAGE } from '../../services/api';
import { activationStrategy } from 'aurelia-router';

@inject(HackerNewsApi)
export class TopStories {
    @observable() private topStories: number[] = [];
    @observable() private pageNumber: number;

    private totalPages: number;
    private pageStories: any[] = [];
    private offset: number;

    private readonly api: HackerNewsApi;

    constructor(api: HackerNewsApi) {
        this.api = api;
    }

    determineActivationStrategy(): string {
        // don't forcefully refresh the page, just invoke our activate method
        return activationStrategy.invokeLifecycle;
    }

    activate(params: any): Promise<void> {
        if (params.page === undefined || isNaN(params.page) || params.page < 1) {
            this.pageNumber = 1;
        } else {
            this.pageNumber = Number(params.page);
        }

        return this.api.fetchTopStories().then(
            (stories: number[]) => {
                this.topStories = stories;
            }
        );
    }

    topStoriesChanged(newValue: number[], oldValue: number[]): void {
        if (newValue === oldValue || this.api === undefined) {
            return;
        }

        this.api.fetchItemsOnPage(this.topStories, this.pageNumber).then(
            (value: any) => {
                this.pageStories = value;
                this.totalPages = Math.ceil(this.topStories.length / STORIES_PER_PAGE);
            }
        );
    }

    pageNumberChanged(newValue: number, oldValue: number): void {
        if (newValue === oldValue) {
            return;
        }

        this.offset = STORIES_PER_PAGE * (newValue - 1);
    }
}

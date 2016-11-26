import { inject, observable } from 'aurelia-framework';
import { HackerNewsApi, STORIES_PER_PAGE } from '../../services/api';
import { activationStrategy } from 'aurelia-router';

@inject(HackerNewsApi)
export class TopStories {
    @observable() private topStories: number[] = [];
    @observable() private currentPage: number;

    private totalPages: number;
    private stories: any[] = [];
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
            this.currentPage = 1;
        } else {
            this.currentPage = Number(params.page);
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

        this.api.fetchItemsOnPage(this.topStories, this.currentPage).then(
            (value: any) => {
                this.stories = value;
                this.totalPages = Math.ceil(this.topStories.length / STORIES_PER_PAGE);
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

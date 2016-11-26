import { inject, observable } from 'aurelia-framework';
import { HackerNewsApi } from '../../services/api';

@inject(HackerNewsApi)
export class Index {
    @observable() topStories: number[] = [];
    pageStories: any[] = [];
    pageNumber: number = 1;

    private readonly api: HackerNewsApi;

    constructor(api: HackerNewsApi) {
        this.api = api;
    }

    activate(): Promise<void> {
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
                console.log(JSON.stringify(value));
            }
        );
    }
}

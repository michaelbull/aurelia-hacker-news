import { inject } from 'aurelia-framework';
import { HackerNewsApi } from '../../services/api';

@inject(HackerNewsApi)
export class NewestStories {
    private readonly api: HackerNewsApi;

    constructor(api: HackerNewsApi) {
        this.api = api;
    }
}

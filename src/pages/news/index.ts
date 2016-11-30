import { inject } from 'aurelia-framework';
import { HackerNewsApi } from '../../services/api';
import { StoryList } from '../story-list';

@inject(HackerNewsApi)
export class TopStories extends StoryList {
    constructor(api: HackerNewsApi) {
        super(api);
    }

    fetchIds(): Promise<number[]> {
        return this.api.fetch('topstories');
    }
}

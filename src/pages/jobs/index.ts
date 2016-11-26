import { inject } from 'aurelia-framework';
import { HackerNewsApi } from '../../services/api';
import { StoryList } from '../story-list';

@inject(HackerNewsApi)
export class JobStories extends StoryList {
    constructor(api: HackerNewsApi) {
        super(api, 'jobstories');
    }
}

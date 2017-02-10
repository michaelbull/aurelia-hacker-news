import { inject } from 'aurelia-framework';
import { HackerNewsApi } from '../../services/api';
import { StoryList } from '../story-list';

@inject(HackerNewsApi)
export class JobStories extends StoryList {
    fetchIds(): Promise<number[]> {
        return this.api.fetch('jobstories');
    }
}

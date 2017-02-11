import {
    inject,
    useView
} from 'aurelia-framework';
import { HackerNewsApi } from '../services/api';
import { StoryList } from './story-list';

@inject(HackerNewsApi)
@useView('./story-list.html')
export class JobStories extends StoryList {
    constructor(api: HackerNewsApi) {
        super(api, 'jobstories');
    }
}

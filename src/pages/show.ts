import {
    inject,
    useView
} from 'aurelia-framework';
import { HackerNewsApi } from '../services/api';
import { StoryList } from './story-list';

@inject(HackerNewsApi)
@useView('./story-list.html')
export class ShowStories extends StoryList {
    constructor(api: HackerNewsApi) {
        super(api, 'showstories');
    }
}

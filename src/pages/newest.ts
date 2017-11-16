import { useView } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HackerNewsApi } from '../services/api';
import { StoryList } from './story-list';

@useView('./story-list.html')
export class NewStories extends StoryList {
    constructor(api: HackerNewsApi, router: Router) {
        super(api, router, 'newstories');
    }
}

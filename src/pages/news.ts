import {
    autoinject,
    useView
} from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HackerNewsApi } from '../services/api';
import { StoryList } from './story-list';

@autoinject()
@useView('./story-list.html')
export class TopStories extends StoryList {
    constructor(api: HackerNewsApi, router: Router) {
        super(api, router, 'topstories');
    }
}

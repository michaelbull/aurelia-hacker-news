import {
    inject,
    useView
} from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HackerNewsApi } from '../services/api';
import { StoryList } from './story-list';

@inject(HackerNewsApi, Router)
@useView('./story-list.html')
export class ShowStories extends StoryList {
    constructor(api: HackerNewsApi, router: Router) {
        super(api, router, 'showstories');
    }
}

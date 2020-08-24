import { useView } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ItemService } from '../services';
import { StoryList } from './story-list';

@useView('./story-list.html')
export class AskStories extends StoryList {
    constructor(router: Router, itemService: ItemService) {
        super(router, itemService, 'askstories');
    }
}

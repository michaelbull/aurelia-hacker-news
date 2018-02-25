import {
    bindable,
    customElement
} from 'aurelia-framework';
import { Item } from '../models/item';

@customElement('hn-story-list')
export class StoryList {
    @bindable() stories: Item[] = [];
    @bindable() offset!: number;
}

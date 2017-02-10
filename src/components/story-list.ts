import {
    bindable,
    customElement
} from 'aurelia-framework';

@customElement('hn-story-list')
export class StoryList {
    @bindable() readonly stories: any[];
    @bindable() readonly offset: number;
}

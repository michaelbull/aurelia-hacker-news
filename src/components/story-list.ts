import {
    bindable,
    customElement
} from 'aurelia-framework';

@customElement('hn-story-list')
export class StoryList {
    @bindable() private readonly stories: any[];
    @bindable() private readonly offset: number;
}

import { bindable, customElement } from 'aurelia-framework';

@customElement('hn-news-list')
export class NewsList {
    @bindable() private readonly stories: any[];
    @bindable() private readonly offset: number;
}

import {bindable, customElement} from 'aurelia-framework';

@customElement('hn-news-list')
export class NewsList {
    @bindable() private readonly stories: any[];
    private readonly anchor: HTMLAnchorElement = document.createElement('a');

    hostnameFrom(url: string): string {
        this.anchor.href = url;
        return this.anchor.hostname.replace('www.', '');
    }
}

import { bindable, customElement, inject } from 'aurelia-framework';
import { HackerNewsApi } from '../services/api';

@customElement('hn-comment')
@inject(HackerNewsApi)
export class Comment {
    private replies: any[];
    private expanded: boolean = true;

    private readonly MAX_DEPTH: number = 8;

    @bindable() private readonly comment: any;
    @bindable() private readonly depth: number;

    private readonly api: HackerNewsApi;

    constructor(api: HackerNewsApi) {
        this.api = api;
    }

    bind(): Promise<void> {
        if (this.comment.kids === undefined || this.comment.kids.length < 1) {
            return Promise.resolve();
        }

        return this.api.fetchItems(this.comment.kids).then(
            (replies: any[]) => {
                this.replies = replies;
            }
        );
    }

    toggle(): void {
        this.expanded = !this.expanded;
    }

    text(): string {
        let raw: string = this.comment.text;
        let url: RegExp = new RegExp(
            '<a href="https:&#x2F;&#x2F;news\.ycombinator\.com&#x2F;item\\?id=(\\d+)" rel="nofollow">' +
            'https:&#x2F;&#x2F;news\.ycombinator\.com&#x2F;item\\?id=\\d+' +
            '<\/a>',
            'g');

        let match: RegExpExecArray | null = url.exec(raw);

        if (match === null) {
            return raw;
        }

        // TODO: avoid hardcoding this href
        let replacement: string = `<a
          href="https://mikebull94.github.io/aurelia-hacker-news/#/item/${match[1]}" 
          rel="nofollow">#${match[1]}</a>`;

        return raw.replace(url, replacement);
    }
}

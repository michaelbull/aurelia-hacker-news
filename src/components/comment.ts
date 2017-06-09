import {
    autoinject,
    bindable,
    customElement
} from 'aurelia-framework';
import { HackerNewsApi } from '../services/api';

@customElement('hn-comment')
@autoinject()
export class Comment {
    readonly MAX_DEPTH: number = 8;

    replies: any[];
    expanded: boolean = true;

    @bindable() readonly comment: any;
    @bindable() readonly depth: number;

    private readonly api: HackerNewsApi;

    constructor(api: HackerNewsApi) {
        this.api = api;
    }

    async bind(): Promise<void> {
        if (this.comment.kids === undefined || this.comment.kids.length < 1) {
            return;
        }

        this.replies = await this.api.fetchItems(this.comment.kids);
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
          href="https://michaelbull.github.io/aurelia-hacker-news/#/item/${match[1]}"
          rel="nofollow">#${match[1]}</a>`;

        return raw.replace(url, replacement);
    }
}

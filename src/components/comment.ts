import {
    autoinject,
    bindable,
    customElement
} from 'aurelia-framework';
import { Item } from '../models/item';
import { HackerNewsApi } from '../services/api';

@autoinject()
@customElement('hn-comment')
export class Comment {
    readonly MAX_DEPTH = 6;

    replies: Item[] = [];
    expanded = true;

    @bindable() comment!: Item;
    @bindable() depth!: number;

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
}

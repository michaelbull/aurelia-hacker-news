import {
    autoinject,
    bindable,
    customElement
} from 'aurelia-framework';
import { Item } from '../models/item';
import { Trie } from '../models/trie';
import { HackerNewsApi } from '../services/api';

@autoinject()
@customElement('hn-comment')
export class Comment {
    readonly MAX_DEPTH = 6;

    expanded = true;

    @bindable() item!: Trie<Item>;
    @bindable() depth!: number;

    private readonly api: HackerNewsApi;

    constructor(api: HackerNewsApi) {
        this.api = api;
    }

    toggle(): void {
        this.expanded = !this.expanded;
    }
}

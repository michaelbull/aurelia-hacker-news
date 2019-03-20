import {
    bindable,
    customElement
} from 'aurelia-framework';
import { Item } from '../models/item';
import { Trie } from '../models/trie';

@customElement('hn-comment')
export class Comment {
    readonly MAX_DEPTH = 6;

    expanded = true;

    @bindable() item!: Trie<Item>;
    @bindable() depth!: number;

    toggle(): void {
        this.expanded = !this.expanded;
    }
}

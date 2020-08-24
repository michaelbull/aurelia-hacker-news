import {
    bindable,
    customElement
} from 'aurelia-framework';
import {
    Item,
    Trie
} from '../models';

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

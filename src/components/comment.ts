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

    expanded = true;

    @bindable() item!: Trie<Item>;
    @bindable() depth!: number;
    @bindable() maxDepth = 6;

    toggle(): void {
        this.expanded = !this.expanded;
    }
}

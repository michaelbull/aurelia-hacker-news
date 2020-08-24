import {
    bindable,
    customElement
} from 'aurelia-framework';
import { Item } from '../models';

@customElement('hn-item-preview')
export class ItemPreview {
    @bindable() item!: Item;
}

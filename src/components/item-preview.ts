import {
    bindable,
    customElement
} from 'aurelia-framework';
import { Item } from '../models/item';

@customElement('hn-item-preview')
export class ItemPreview {
    @bindable() readonly item: Item;
}

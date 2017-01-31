import {
    bindable,
    customElement
} from 'aurelia-framework';

@customElement('hn-item-preview')
export class ItemPreview {
    @bindable() item: any;
}

import {
    bindable,
    customElement
} from 'aurelia-framework';

@customElement('hn-paginator')
export class Paginator {
    @bindable() readonly current: number;
    @bindable() readonly total: number;
    @bindable() readonly route: string;
}

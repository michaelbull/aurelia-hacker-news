import {
    bindable,
    customElement
} from 'aurelia-framework';

@customElement('hn-paginator')
export class Paginator {
    @bindable() current!: number;
    @bindable() total!: number;
    @bindable() route!: string;
}

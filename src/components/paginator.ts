import {
    bindable,
    customElement
} from 'aurelia-framework';

@customElement('hn-paginator')
export class Paginator {
    @bindable() private readonly current: number;
    @bindable() private readonly total: number;
    @bindable() private readonly route: string;
}

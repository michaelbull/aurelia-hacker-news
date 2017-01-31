import {
    bindable,
    customElement
} from 'aurelia-framework';

@customElement('hn-paginator')
export class Paginator {
    @bindable() readonly current: number;
    @bindable() readonly total: number;
    @bindable() readonly route: string;

    prev(): number {
        return this.current > 1 ? this.current - 1 : 1;
    }

    next(): number {
        return this.current < this.total ? this.current + 1 : this.total;
    }
}

import { valueConverter } from 'aurelia-framework';

const timeago: any = require('timeago.js/dist/timeago.js');

@valueConverter('timeago')
export class TimeagoValueConverter {
    toView(timestamp: number): string {
        return new timeago().format(timestamp * 1000);
    }
}

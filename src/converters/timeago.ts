import { valueConverter } from 'aurelia-framework';
import timeago from 'timeago.js';

@valueConverter('timeago')
export class TimeagoValueConverter {
    toView(timestamp: number): string {
        return timeago().format(timestamp * 1000);
    }
}

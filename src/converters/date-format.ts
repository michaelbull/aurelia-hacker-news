import { valueConverter } from 'aurelia-framework';

declare let require: any;
const timeago: any = require('../../node_modules/timeago.js/dist/timeago.js');

@valueConverter('dateFormat')
export class DateFormatValueConverter {
    toView(timestamp: number): string {
        return new timeago().format(timestamp * 1000);
    }
}

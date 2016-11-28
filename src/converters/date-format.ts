const timeago: any = require('../../node_modules/timeago.js/dist/timeago.js');

export class DateFormatValueConverter {
    toView(timestamp: number): string {
        return new timeago().format(timestamp * 1000);
    }
}

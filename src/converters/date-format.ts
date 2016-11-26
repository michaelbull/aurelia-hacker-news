import * as moment from 'moment';

export class DateFormatValueConverter {
    toView(timestamp: number, format: string): string {
        return moment.unix(timestamp).format(format);
    }
}

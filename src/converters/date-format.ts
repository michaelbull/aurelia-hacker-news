function pad(value: number): string {
    return '' + (value < 10 && value >= 0 ? '0' + value : value);
}

const MONTHS: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export class DateFormatValueConverter {
    toView(timestamp: number, includeYear: boolean = false): string {
        let date: Date = new Date(timestamp * 1000);

        let hour: number = date.getHours();
        let period: string = 'am';

        if (hour >= 12) {
            hour -= 12;
            period = 'pm';
        }

        return hour + ':' + pad(date.getMinutes()) + period
            + ' on ' + date.getDate() + ' ' + MONTHS[date.getMonth()] + (includeYear ? ' ' + date.getFullYear() : '');
    }
}

import { valueConverter } from 'aurelia-framework';

@valueConverter('pluralise')
export class PluraliseValueConverter {
    toView(value: number, text: string): string {
        if (value > 1) {
            return `${text}s`;
        } else {
            return text;
        }
    }
}

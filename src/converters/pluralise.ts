import { valueConverter } from 'aurelia-framework';

@valueConverter('pluralise')
export class PluraliseValueConverter {
    toView(value: number, text: string): string {
        return value > 1 ? `${text}s` : text;
    }
}

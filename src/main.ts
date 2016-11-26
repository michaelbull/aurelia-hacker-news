import '../style/index.scss';
import { Aurelia } from 'aurelia-framework';

export function configure(aurelia: Aurelia): void {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature('components')
        .feature('converters');

    aurelia.start().then(() => aurelia.setRoot('app'));
}

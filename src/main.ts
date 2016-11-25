import '../style/index.scss';
import { Aurelia } from 'aurelia-framework';

export function configure(aurelia: Aurelia): void {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature('components');

    aurelia.start().then(() => aurelia.setRoot('app'));
}

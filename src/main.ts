import { Aurelia } from 'aurelia-framework';
import * as NProgress from 'nprogress';
import '../style/index.scss';

export function configure(aurelia: Aurelia): void {
    aurelia.use
        .standardConfiguration()
        .feature('components')
        .feature('converters');

    if (process.env.NODE_ENV !== 'production') {
        aurelia.use.developmentLogging();
    }

    NProgress.configure({
        trickleSpeed: 100,
        template: `
          <div class="loader">
            <div class="loader__bar" role="bar">
              <div class="loader__peg"></div>
            </div>
            <div class="loader__spinner" role="spinner">
              <div class="loader__spinner-icon"></div>
            </div>
          </div>
        `
    });

    aurelia.start().then(() => aurelia.setRoot('app'));
}

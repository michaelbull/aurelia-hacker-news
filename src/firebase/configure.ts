import { FrameworkConfiguration } from 'aurelia-framework';
import { URL } from './url';
import { VERSION } from './version';

export async function configure(config: FrameworkConfiguration): Promise<void> {
    let firebase = await import(/* webpackChunkName: "firebase" */ 'firebase/app');
    await import(/* webpackChunkName: "firebase" */ 'firebase/database');

    let database = firebase
        .initializeApp({ databaseURL: URL })
        .database()
        .ref(VERSION);

    config.container.registerInstance('database', database);
}

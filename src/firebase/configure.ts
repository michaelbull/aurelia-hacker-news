import { FrameworkConfiguration } from 'aurelia-framework';
import {
    DATABASE_URL,
    DATABASE_VERSION
} from './database';

export async function configure(config: FrameworkConfiguration): Promise<void> {
    let firebase = await import(/* webpackChunkName: "firebase" */ 'firebase/app');
    await import(/* webpackChunkName: "firebase" */ 'firebase/database');

    let database = firebase
        .initializeApp({ databaseURL: DATABASE_URL })
        .database()
        .ref(DATABASE_VERSION);

    config.container.registerInstance('database', database);
}

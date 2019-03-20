import { FrameworkConfiguration } from 'aurelia-framework';
import Reference = firebase.database.Reference;

const API_URL = 'https://hacker-news.firebaseio.com';
const API_VERSION = 'v0';

export async function configure(config: FrameworkConfiguration): Promise<void> {
    let firebase = await import(/* webpackChunkName: "firebase" */ 'firebase/app');
    await import(/* webpackChunkName: "firebase" */ 'firebase/database');

    let database = firebase
        .initializeApp({ databaseURL: API_URL })
        .database()
        .ref(API_VERSION);

    config.container.registerInstance('database', database);
}

export async function valueOf(ref: Reference): Promise<any> {
    let snapshot = await ref.once('value');
    return snapshot.val();
}

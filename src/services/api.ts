import { autoinject } from 'aurelia-framework';
import * as firebase from 'firebase';

const API_URL: string = 'https://hacker-news.firebaseio.com';
const API_VERSION: string = '/v0';
export const STORIES_PER_PAGE: number = 25;

@autoinject()
export class HackerNewsApi {
    private readonly db: firebase.database.Reference;

    constructor() {
        this.db = firebase.initializeApp({ databaseURL: API_URL }).database().ref(API_VERSION);
    }

    fetchItemsOnPage(ids: number[], page: number): Promise<any[]> {
        let start: number = (page - 1) * STORIES_PER_PAGE;
        let end: number = page * STORIES_PER_PAGE;
        return this.fetchItems(ids.slice(start, end));
    }

    fetchItems(ids: number[]): Promise<any[]> {
        if (ids.length < 1) {
            return Promise.resolve([]);
        } else {
            return Promise.all(ids.map((id: number) => this.fetchItem(id)));
        }
    }

    fetchItem(id: number): Promise<any> {
        return this.fetch('item/' + id);
    }

    fetch(path: string): Promise<any> {
        return new Promise((resolve: (value: any) => void, reject: (reason: any) => void): void => {
            this.db.child(path).once('value', (snapshot: firebase.database.DataSnapshot) => {
                console.log(snapshot.val());
                resolve(snapshot.val());
            }, reject);
        });
    }
}

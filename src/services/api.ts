import * as firebase from 'firebase/app';
import 'firebase/database';
import { Item } from '../models/item';
import { User } from '../models/user';
import DataSnapshot = firebase.database.DataSnapshot;

const API_URL = 'https://hacker-news.firebaseio.com';
const API_VERSION = '/v0';
export const STORIES_PER_PAGE = 25;

export class HackerNewsApi {
    private readonly db = firebase.initializeApp({ databaseURL: API_URL }).database().ref(API_VERSION);

    fetchItemsOnPage(ids: number[], page: number): Promise<Item[]> {
        let start = (page - 1) * STORIES_PER_PAGE;
        let end = page * STORIES_PER_PAGE;
        return this.fetchItems(ids.slice(start, end));
    }

    fetchItems(ids: number[]): Promise<Item[]> {
        if (ids.length < 1) {
            return Promise.resolve([]);
        } else {
            return Promise.all(ids.map((id) => this.fetchItem(id)));
        }
    }

    fetchItem(id: number): Promise<Item> {
        return this.fetch(`item/${id}`);
    }

    fetchUser(id: string): Promise<User> {
        return this.fetch(`user/${id}`);
    }

    fetch(path: string): Promise<any> {
        return new Promise((resolve: (value: any) => void, reject: (reason: any) => void): void => {
            this.db.child(path).once('value', (snapshot: DataSnapshot) => {
                resolve(snapshot.val());
            }, reject);
        });
    }
}

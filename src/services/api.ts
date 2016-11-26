import { autoinject } from 'aurelia-framework';
import * as firebase from 'firebase';

const API_URL: string = 'https://hacker-news.firebaseio.com';
const API_VERSION: string = '/v0';
export const STORIES_PER_PAGE: number = 20;

@autoinject()
export class HackerNewsApi {
    private cache: any[] = [];

    private readonly db: firebase.database.Reference;

    constructor() {
        this.db = firebase.initializeApp({ databaseURL: API_URL }).database().ref(API_VERSION);
    }

    fetchTopStories(): Promise<number[]> {
        return new Promise((resolve: (value: any) => void, reject: (reason: any) => void): void => {
            this.db.child('topstories').on('value', (snapshot: firebase.database.DataSnapshot) => {
                resolve(snapshot.val());
            }, reject);
        });
    }

    fetchItemsOnPage(topStories: number[], page: number): Promise<any[]> {
        let firstStory: number = (page - 1) * STORIES_PER_PAGE;
        let lastStory: number = page * STORIES_PER_PAGE;
        let stories: number[] = topStories.slice(firstStory, lastStory);
        return this.fetchItems(stories);
    }

    fetchItems(ids: number[]): Promise<any[]> {
        if (ids.length < 1) {
            return Promise.resolve([]);
        } else {
            return Promise.all(ids.map((id: number) => this.fetchItem(id)));
        }
    }

    fetchItem(id: number): Promise<any> {
        return new Promise((resolve: (value: any) => void, reject: (reason: any) => void): void => {
            if (this.cache[id]) {
                resolve(this.cache[id]);
            } else {
                this.db.child('item/' + id).once('value', (snapshot: firebase.database.DataSnapshot) => {
                    this.cache[id] = snapshot.val();
                    resolve(this.cache[id]);
                }, reject);
            }
        });
    }
}

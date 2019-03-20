import { inject } from 'aurelia-framework';
import { Item } from '../models/item';
import { Trie } from '../models/trie';
import { User } from '../models/user';
import Reference = firebase.database.Reference;

export const STORIES_PER_PAGE = 30;

async function valueOf(ref: Reference): Promise<any> {
    let snapshot = await ref.once('value');
    return snapshot.val();
}

export class HackerNewsApi {
    private readonly database: Reference;
    private readonly users: Reference;
    private readonly items: Reference;

    constructor(@inject('database') database: Reference) {
        this.database = database;
        this.users = database.child('user');
        this.items = database.child('item');
    }

    fetchItemsOnPage(items: number[], page: number): Promise<Item[]> {
        let start = (page - 1) * STORIES_PER_PAGE;
        let end = page * STORIES_PER_PAGE;
        return this.fetchItems(items.slice(start, end));
    }

    async fetchItems(ids: number[]): Promise<Item[]> {
        let result: Item[] = [];

        for (let id of ids) {
            let item = await this.fetchItem(id);

            if (item !== undefined) {
                result.push(item);
            }
        }

        return result;
    }

    fetchItemIds(name: string): Promise<number[]> {
        return valueOf(this.database.child(name));
    }

    fetchItem(id: number): Promise<Item | undefined> {
        return valueOf(this.items.child(id.toString()));
    }

    fetchUser(id: string): Promise<User | undefined> {
        return valueOf(this.users.child(id.toString()));
    }

    async fetchItemTrie(id: number): Promise<Trie<Item> | undefined> {
        let value = await this.fetchItem(id);
        if (value === undefined) {
            return undefined;
        }

        let children: (Trie<Item> | undefined)[] = [];
        if (value.kids !== undefined && value.kids.length > 0) {
            children = await Promise.all(value.kids.map(kid => this.fetchItemTrie(kid)));
        }

        return {
            value,
            children
        };
    }
}

import { inject } from 'aurelia-framework';
import { valueOf } from '../firebase';
import { Item } from '../models/item';
import Reference = firebase.database.Reference;

export class ItemRepository {
    private readonly database: Reference;
    private readonly items: Reference;

    constructor(@inject('database') database: Reference) {
        this.database = database;
        this.items = database.child('item');
    }

    findById(id: number): Promise<Item | undefined> {
        return valueOf(this.items.child(id.toString()));
    }

    findIdsByName(name: string): Promise<number[]> {
        return valueOf(this.database.child(name));
    }
}

import { autoinject } from 'aurelia-framework';
import {
    Item,
    Trie
} from '../models';
import { ItemRepository } from '../repository';

@autoinject()
export class ItemService {
    private readonly repository: ItemRepository;

    constructor(repository: ItemRepository) {
        this.repository = repository;
    }

    page(items: number[], page: number, pageSize: number): Promise<Item[]> {
        let start = (page - 1) * pageSize;
        let end = page * pageSize;
        let ids = items.slice(start, end);
        return this.fetchItems(ids);
    }

    ids(name: string): Promise<number[]> {
        return this.repository.findIdsByName(name);
    }

    async populate(id: number): Promise<Trie<Item> | undefined> {
        let value = await this.repository.findById(id);
        if (value === undefined) {
            return undefined;
        }

        let children: Trie<Item>[] = [];
        if (value.kids !== undefined && value.kids.length > 0) {
            let resolved = await Promise.all(value.kids.map(kid => this.populate(kid)));

            for (let child of resolved) {
                if (child !== undefined) {
                    children.push(child);
                }
            }
        }

        return {
            value,
            children
        };
    }

    private async fetchItems(ids: number[]): Promise<Item[]> {
        let result: Item[] = [];

        for (let id of ids) {
            let item = await this.repository.findById(id);

            if (item !== undefined) {
                result.push(item);
            }
        }

        return result;
    }
}

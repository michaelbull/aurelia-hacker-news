import { autoinject } from 'aurelia-framework';
import {
    NavigationInstruction,
    RoutableComponentActivate,
    RoutableComponentCanActivate,
    RouteConfig
} from 'aurelia-router';
import { Item } from '../models/item';
import { Trie } from '../models/trie';
import { HackerNewsApi } from '../services/api';

function decodeHtml(html: string): string {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

@autoinject()
export class ItemPage implements RoutableComponentCanActivate, RoutableComponentActivate {
    item: Trie<Item> | null = null;

    private readonly api: HackerNewsApi;

    constructor(api: HackerNewsApi) {
        this.api = api;
    }

    canActivate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): boolean {
        return params.id !== undefined && !isNaN(params.id) && params.id >= 0;
    }

    async activate(params: any, routeConfig: RouteConfig): Promise<void> {
        this.item = await this.api.fetchItemTrie(params.id);

        if (this.item !== null && this.item.value.title !== undefined) {
            routeConfig.navModel!.setTitle(decodeHtml(this.item.value.title));
        }
    }
}

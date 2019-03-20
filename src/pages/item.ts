import { autoinject } from 'aurelia-framework';
import {
    NavigationInstruction,
    RoutableComponentActivate,
    RoutableComponentCanActivate,
    RouteConfig
} from 'aurelia-router';
import { Item } from '../models/item';
import { Trie } from '../models/trie';
import { ItemService } from '../services/item-service';

function decodeHtml(html: string): string {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

@autoinject()
export class ItemPage implements RoutableComponentCanActivate, RoutableComponentActivate {
    item?: Trie<Item>;

    private readonly itemService: ItemService;

    constructor(itemService: ItemService) {
        this.itemService = itemService;
    }

    canActivate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): boolean {
        return params.id !== undefined && !isNaN(params.id) && params.id >= 0;
    }

    async activate(params: any, routeConfig: RouteConfig): Promise<void> {
        this.item = await this.itemService.populate(params.id);

        if (this.item !== undefined && this.item.value.title !== undefined) {
            routeConfig.navModel!.setTitle(decodeHtml(this.item.value.title));
        }
    }
}

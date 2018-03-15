import { autoinject } from 'aurelia-framework';
import {
    NavigationInstruction,
    RoutableComponentActivate,
    RoutableComponentCanActivate,
    RouteConfig,
    Router
} from 'aurelia-router';
import { Item } from '../models/item';
import { HackerNewsApi } from '../services/api';

function decodeHtml(html: string): string {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

@autoinject()
export class ItemPage implements RoutableComponentCanActivate, RoutableComponentActivate {
    item!: Item;
    comments: Item[] = [];

    private readonly router: Router;
    private readonly api: HackerNewsApi;

    constructor(router: Router, api: HackerNewsApi) {
        this.router = router;
        this.api = api;
    }

    canActivate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): boolean {
        return params.id !== undefined && !isNaN(params.id) && params.id >= 0;
    }

    async activate(params: any, routeConfig: RouteConfig): Promise<void> {
        this.comments = [];
        this.item = await this.api.fetchItem(params.id);

        if (this.item.kids !== undefined && this.item.kids.length >= 1) {
            this.comments = await this.api.fetchItems(this.item.kids);
        }

        if (this.item !== undefined && this.item.title !== undefined) {
            routeConfig.navModel!.setTitle(decodeHtml(this.item.title));
        }
    }
}

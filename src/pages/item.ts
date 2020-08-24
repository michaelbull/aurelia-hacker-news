import { autoinject } from 'aurelia-framework';
import {
    NavigationInstruction,
    RoutableComponentActivate,
    RoutableComponentCanActivate,
    RouteConfig
} from 'aurelia-router';
import {
    Item,
    Trie
} from '../models';
import {
    HtmlDecoder,
    ItemService
} from '../services';

@autoinject()
export class ItemPage implements RoutableComponentCanActivate, RoutableComponentActivate {
    item?: Trie<Item>;

    private readonly htmlDecoder: HtmlDecoder;
    private readonly itemService: ItemService;

    constructor(htmlDecoder: HtmlDecoder, itemService: ItemService) {
        this.htmlDecoder = htmlDecoder;
        this.itemService = itemService;
    }

    canActivate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): boolean {
        return params.id !== undefined && !isNaN(params.id) && params.id >= 0;
    }

    async activate(params: any, routeConfig: RouteConfig): Promise<void> {
        this.item = await this.itemService.populate(params.id);

        let title = this.item?.value?.title;
        let navModel = routeConfig.navModel;

        if (title !== undefined && navModel !== undefined) {
            let decodedTitle = this.htmlDecoder.decode(title);
            navModel.setTitle(decodedTitle);
        }
    }
}

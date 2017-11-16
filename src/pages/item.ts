import { autoinject } from 'aurelia-framework';
import { RouteConfig, Router } from 'aurelia-router';
import { HackerNewsApi } from '../services/api';

@autoinject()
export class Item {
    item: any;
    comments: any[];

    private readonly router: Router;
    private readonly api: HackerNewsApi;

    constructor(router: Router, api: HackerNewsApi) {
        this.router = router;
        this.api = api;
    }

    async activate(params: any, routeConfig: RouteConfig): Promise<void> {
        if (params.id === undefined || isNaN(params.id) || params.id < 0) {
            this.router.navigateToRoute('news');
            return;
        }

        this.comments = [];
        this.item = await this.api.fetchItem(params.id);

        if (this.item.kids !== undefined && this.item.kids.length >= 1) {
            this.comments = await this.api.fetchItems(this.item.kids);
        }

        if (routeConfig.navModel !== undefined && this.item !== undefined) {
            routeConfig.navModel.setTitle(`${this.item.title}`);
        }
    }
}

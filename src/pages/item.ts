import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HackerNewsApi } from '../services/api';

@inject(Router, HackerNewsApi)
export class Item {
    item: any;
    comments: any[];

    private readonly router: Router;
    private readonly api: HackerNewsApi;

    constructor(router: Router, api: HackerNewsApi) {
        this.router = router;
        this.api = api;
    }

    async activate(params: any): Promise<void> {
        if (params.id === undefined || isNaN(params.id) || params.id < 0) {
            this.router.navigateToRoute('news');
            return;
        }

        this.comments = [];
        this.item = await this.api.fetchItem(params.id);

        if (this.item.kids !== undefined && this.item.kids.length >= 1) {
            this.comments = await this.api.fetchItems(this.item.kids);
        }

        window.scrollTo(0, 0);
    }
}

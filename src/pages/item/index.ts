import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HackerNewsApi } from '../../services/api';

@inject(Router, HackerNewsApi)
export class Item {
    private readonly router: Router;
    private readonly api: HackerNewsApi;

    private id: number;
    private item: any;
    private comments: any[];

    constructor(router: Router, api: HackerNewsApi) {
        this.router = router;
        this.api = api;
    }

    async activate(params: any): Promise<void> {
        window.scrollTo(0, 0);

        if (params.id === undefined || isNaN(params.id) || params.id < 0) {
            this.router.navigateToRoute('news');
            return;
        }

        this.id = params.id;
        this.comments = [];

        this.item = await this.api.fetchItem(this.id);

        if (this.item.kids !== undefined && this.item.kids.length >= 1) {
            this.comments = await this.api.fetchItems(this.item.kids);
        }
    }
}

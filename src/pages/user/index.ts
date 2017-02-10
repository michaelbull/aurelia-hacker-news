import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HackerNewsApi } from '../../services/api';

@inject(Router, HackerNewsApi)
export class User {
    user: any;

    private readonly router: Router;
    private readonly api: HackerNewsApi;
    private id: string;

    constructor(router: Router, api: HackerNewsApi) {
        this.router = router;
        this.api = api;
    }

    async activate(params: any): Promise<void> {
        if (params.id === undefined) {
            this.router.navigateToRoute('news');
            return;
        }

        this.id = params.id;
        this.user = await this.api.fetch(`user/${this.id}`);
    }
}

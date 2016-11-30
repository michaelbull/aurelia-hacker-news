import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HackerNewsApi } from '../../services/api';

@inject(Router, HackerNewsApi)
export class User {
    private readonly router: Router;
    private readonly api: HackerNewsApi;
    private id: string;
    private user: any;

    constructor(router: Router, api: HackerNewsApi) {
        this.router = router;
        this.api = api;
    }

    activate(params: any): Promise<void> {
        if (params.id === undefined) {
            this.router.navigateToRoute('news');
            return Promise.resolve();
        }

        this.id = params.id;

        return this.api.fetch('user/' + this.id).then(
            (user: any) => {
                this.user = user;
            }
        );
    }
}

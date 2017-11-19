import { autoinject } from 'aurelia-framework';
import {
    NavigationInstruction,
    RoutableComponentActivate,
    RoutableComponentCanActivate,
    RouteConfig,
    Router
} from 'aurelia-router';
import { HackerNewsApi } from '../services/api';

@autoinject()
export class User implements RoutableComponentCanActivate, RoutableComponentActivate {
    user: any;

    private readonly router: Router;
    private readonly api: HackerNewsApi;

    constructor(router: Router, api: HackerNewsApi) {
        this.router = router;
        this.api = api;
    }

    canActivate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): boolean {
        return params.id !== undefined;
    }

    async activate(params: any): Promise<void> {
        this.user = await this.api.fetch(`user/${params.id}`);
    }
}

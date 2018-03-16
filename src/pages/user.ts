import { autoinject } from 'aurelia-framework';
import {
    NavigationInstruction,
    RoutableComponentActivate,
    RoutableComponentCanActivate,
    RouteConfig
} from 'aurelia-router';
import { User } from '../models/user';
import { HackerNewsApi } from '../services/api';

@autoinject()
export class UserPage implements RoutableComponentCanActivate, RoutableComponentActivate {
    user: User | null = null;

    private readonly api: HackerNewsApi;

    constructor(api: HackerNewsApi) {
        this.api = api;
    }

    canActivate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): boolean {
        return params.id !== undefined;
    }

    async activate(params: any): Promise<void> {
        this.user = await this.api.fetchUser(params.id);
    }
}

import { autoinject } from 'aurelia-framework';
import {
    NavigationInstruction,
    RoutableComponentActivate,
    RoutableComponentCanActivate,
    RouteConfig
} from 'aurelia-router';
import { User } from '../models/user';
import { UserRepository } from '../repository/user-repository';

@autoinject()
export class UserPage implements RoutableComponentCanActivate, RoutableComponentActivate {
    user?: User;

    private readonly users: UserRepository;

    constructor(users: UserRepository) {
        this.users = users;
    }

    canActivate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): boolean {
        return params.id !== undefined;
    }

    async activate(params: any): Promise<void> {
        this.user = await this.users.findById(params.id);
    }
}

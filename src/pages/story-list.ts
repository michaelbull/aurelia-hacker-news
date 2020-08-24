import {
    activationStrategy,
    ActivationStrategyType,
    RoutableComponentActivate,
    RoutableComponentCanActivate,
    RoutableComponentDetermineActivationStrategy,
    Router
} from 'aurelia-router';
import { Item } from '../models/item';
import { ItemService } from '../services/item-service';

const STORIES_PER_PAGE = 30;

export abstract class StoryList implements RoutableComponentCanActivate, RoutableComponentActivate, RoutableComponentDetermineActivationStrategy {

    readonly stories: Item[] = [];
    offset = 0;
    currentPage = 1;
    totalPages = 0;

    protected readonly router: Router;
    protected readonly itemService: ItemService;
    readonly route: string;

    protected constructor(router: Router, itemService: ItemService, route: string) {
        this.router = router;
        this.itemService = itemService;
        this.route = route;
    }

    determineActivationStrategy(): ActivationStrategyType {
        return activationStrategy.replace;
    }

    canActivate(params: any): boolean {
        return params.page === undefined || !isNaN(params.page);
    }

    async activate(params: any): Promise<void> {
        if (params.page !== undefined) {
            this.currentPage = Number(params.page);
        }

        let allStories = await this.itemService.ids(this.route);
        this.totalPages = Math.ceil(allStories.length / STORIES_PER_PAGE);

        if (this.currentPage > this.totalPages) {
            await this.router.navigateToRoute(this.route, { page: this.totalPages });
        } else {
            let newStories = await this.itemService.page(allStories, this.currentPage, STORIES_PER_PAGE);
            this.stories.splice(0, this.stories.length, ...newStories);
            this.offset = STORIES_PER_PAGE * (this.currentPage - 1);
        }
    }
}

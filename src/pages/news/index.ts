import { inject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Index {
    stories: number[] = [];

    private readonly events: EventAggregator;
    private subscription: Subscription;

    constructor(events: EventAggregator) {
        this.events = events;
    }

    activate(): void {
        this.subscription = this.events.subscribe('topstories:updated', this.topStoriesListener);
    }

    deactivate(): void {
        this.subscription.dispose();
    }

    private topStoriesListener = (stories: number[]): void => {
        this.stories = stories;
    }
}

import { bindable, customElement, inject } from 'aurelia-framework';
import { HackerNewsApi } from '../services/api';

@customElement('hn-comment')
@inject(HackerNewsApi)
export class Comment {
    private replies: any[];
    private expanded: boolean = true;

    private readonly MAX_DEPTH: number = 8;

    @bindable() private readonly comment: any;
    @bindable() private readonly depth: number;

    private readonly api: HackerNewsApi;

    constructor(api: HackerNewsApi) {
        this.api = api;
    }

    bind(): Promise<void> {
        if (this.comment.kids === undefined || this.comment.kids.length < 1) {
            return Promise.resolve();
        }

        return this.api.fetchItems(this.comment.kids).then(
            (replies: any[]) => {
                this.replies = replies;
            }
        );
    }

    toggle(): void {
        this.expanded = !this.expanded;
    }
}

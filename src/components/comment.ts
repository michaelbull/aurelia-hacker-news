import {bindable, customElement, inject} from 'aurelia-framework';
import { HackerNewsApi } from '../services/api';

@customElement('hn-comment')
@inject(HackerNewsApi)
export class Comment {
    private replies: any[];

    @bindable() private readonly comment: any;
    private readonly api: HackerNewsApi;

    constructor(api: HackerNewsApi) {
        this.api = api;
    }

    bind(): Promise<void> {
        if (this.comment.id === 13043014) {
            console.log(JSON.stringify(this.comment));
        }

        if (this.comment.kids === undefined || this.comment.kids.length < 1) {
            return Promise.resolve();
        }

        return this.api.fetchItems(this.comment.kids).then(
            (replies: any[]) => {
                this.replies = replies;
            }
        );
    }
}

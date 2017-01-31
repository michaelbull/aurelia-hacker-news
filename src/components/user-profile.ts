import {
    bindable,
    customElement
} from 'aurelia-framework';

@customElement('hn-user-profile')
export class UserProfile {
    @bindable() readonly user: any;
}

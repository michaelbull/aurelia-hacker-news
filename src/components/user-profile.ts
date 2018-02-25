import {
    bindable,
    customElement
} from 'aurelia-framework';
import { User } from '../models/user';

@customElement('hn-user-profile')
export class UserProfile {
    @bindable() user!: User;
}

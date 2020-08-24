import {
    bindable,
    customElement
} from 'aurelia-framework';
import { User } from '../models';

@customElement('hn-user-profile')
export class UserProfile {
    @bindable() user?: User;
}

import {
    bindable,
    containerless,
    customElement
} from 'aurelia-framework';
import { NavModel } from 'aurelia-router';

@containerless()
@customElement('hn-nav-bar')
export class NavBar {
    @bindable() navigation: NavModel[] = [];
}

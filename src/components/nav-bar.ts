import {
    bindable,
    customElement
} from 'aurelia-framework';
import { NavModel } from 'aurelia-router';

@customElement('hn-nav-bar')
export class NavBar {
    @bindable() readonly navigation: NavModel[];
}

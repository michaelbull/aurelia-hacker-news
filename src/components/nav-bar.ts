import { bindable, customElement } from 'aurelia-framework';
import { NavModel } from 'aurelia-router';

@customElement('hn-nav-bar')
export class NavBar {
    @bindable() private readonly navigation: NavModel[];
}

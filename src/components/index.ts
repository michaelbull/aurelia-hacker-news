import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
    config.globalResources([
        './comment',
        './item-preview',
        './nav-bar',
        './paginator',
        './story-list',
        './user-profile'
    ]);
}

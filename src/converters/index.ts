import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
    config.globalResources([
        './hostname',
        './pluralise',
        './timeago'
    ]);
}

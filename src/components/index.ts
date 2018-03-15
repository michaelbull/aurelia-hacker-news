import {
    FrameworkConfiguration,
    PLATFORM
} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
    config.globalResources([
        PLATFORM.moduleName('./comment'),
        PLATFORM.moduleName('./item-preview'),
        PLATFORM.moduleName('./nav-bar'),
        PLATFORM.moduleName('./paginator'),
        PLATFORM.moduleName('./story-list'),
        PLATFORM.moduleName('./text'),
        PLATFORM.moduleName('./user-profile')
    ]);
}

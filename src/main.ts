import {
    Aurelia,
    PLATFORM
} from 'aurelia-framework';

export async function configure(aurelia: Aurelia): Promise<void> {
    aurelia.use
        .standardConfiguration()
        .feature(PLATFORM.moduleName('components/index'))
        .feature(PLATFORM.moduleName('converters/index'))
        .feature(PLATFORM.moduleName('firebase/index'));

    if (process.env.NODE_ENV !== 'production') {
        aurelia.use.developmentLogging();
    }

    await aurelia.start();
    await aurelia.setRoot(PLATFORM.moduleName('app'));
}

Error.stackTraceLimit = Infinity;

import 'aurelia-bootstrapper-webpack';
import 'aurelia-polyfills';

function requireAll(r: any): void {
    r.keys().forEach(r);
}

requireAll((require as any).context('./unit', true, /\.spec\.ts$/));

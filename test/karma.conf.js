var path = require('path'),
    webpackConfig = require('../webpack.config.js');

webpackConfig.entry = {};
webpackConfig.devtool = 'inline-source-map';

/* enable inline source maps for coverage reports */
var loaders = webpackConfig.module.loaders;
for (var i = 0; i < loaders.length; i++) {
    if (loaders[i].loader === 'awesome-typescript-loader') {
        loaders[i].query = {
            target: 'es5',
            sourceMap: false,
            inlineSourceMap: true
        }
    }
}

/* configure karma */
module.exports = function (config) {
    var coverage = config.singleRun ? ['coverage'] : [];

    if (config.singleRun) {
        webpackConfig.module.postLoaders = [
            {
                test: /\.ts$/,
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    /node_modules/,
                    /\.spec\.ts$/
                ]
            }
        ];
    }

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: __dirname,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'jasmine'
        ],

        // list of files / patterns to load in the browser
        files: [
            { pattern: 'spec-bundle.ts', watched: false }
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'spec-bundle.ts': ['webpack', 'sourcemap'],
            '../src/**/*.ts': ['sourcemap']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'html']
            .concat(coverage)
            .concat(coverage.length > 0 ? ['remap-coverage'] : []),

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO ||
        // config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'Chrome'
        ],

        // webpack
        webpack: webpackConfig,

        // test reports
        htmlReporter: {
            outputFile: '../reports/unit/index.html',
            groupSuites: true,
            useCompactStyle: true,
            useLegacyStyle: false
        },

        // coverage reports
        coverageReporter: {
            type: 'in-memory'
        },
        remapCoverageReporter: {
            html: './reports/coverage',
            json: './reports/coverage/coverage.json'
        }
    });
};

var webpack = require('webpack'),
    cssnano = require('cssnano'),
    SassLintPlugin = require('sasslint-webpack-plugin'),
    AureliaWebPackPlugin = require('aurelia-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var prodEnv = (process.env.NODE_ENV === 'production');
var testEnv = (process.env.NODE_ENV === 'test');

module.exports = {
    entry: {
        app: [
            './src/main.ts'
        ],
        vendor: [
            'aurelia-binding',
            'aurelia-bootstrapper-webpack',
            'aurelia-dependency-injection',
            'aurelia-event-aggregator',
            'aurelia-framework',
            'aurelia-history',
            'aurelia-history-browser',
            'aurelia-http-client',
            'aurelia-loader',
            'aurelia-loader-webpack',
            'aurelia-logging',
            'aurelia-logging-console',
            'aurelia-metadata',
            'aurelia-pal',
            'aurelia-pal-browser',
            'aurelia-path',
            'aurelia-polyfills',
            'aurelia-route-recognizer',
            'aurelia-router',
            'aurelia-task-queue',
            'aurelia-templating',
            'aurelia-templating-binding',
            'aurelia-templating-router',
            'aurelia-templating-resources'
        ]
    },

    stats: {
        hash: true,
        version: true,
        timings: true,
        assets: false,
        entrypoints: false,
        chunks: false,
        modules: false,
        reasons: false,
        usedExports: false,
        providedExports: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: false,
        publicPath: false
    },

    output: {
        path: './dist',
        publicPath: '/dist/',
        filename: '[name].js'
    },

    resolve: {
        extensions: [
            '',
            '.webpack.js',
            '.web.js',
            '.js',
            '.jsx',
            '.ts',
            '.tsx'
        ]
    },

    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint'
            }
        ],
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                query: {
                    target: 'es5'
                }
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            },
            {
                test: /\.(eot|svg|ttf|otf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    },

    devServer: {
        stats: 'errors-only',
        proxy: {
            '/api': {
                target: 'https://hacker-news.firebaseio.com/v0/',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV
            }
        }),
        new AureliaWebPackPlugin(),
        new SassLintPlugin({
            configFile: 'sass-lint.yml',
            glob: 'style/**/*.s?(a|c)ss',
            failOnWarning: prodEnv,
            failOnError: prodEnv,
            ignorePlugins: [
                'extract-text-webpack-plugin'
            ]
        }),
        new ExtractTextPlugin('[name].css'),
        new OptimizeCssAssetsPlugin({
            canPrint: false,
            cssProcessor: cssnano,
            cssProcessorOptions: {
                autoprefixer: {
                    add: true,
                    remove: false
                },
                discardUnused: false
            }
        })
    ],

    tslint: {
        emitErrors: true,
        failOnHint: true,
        fileOutput: {
            dir: 'reports/tslint',
            clean: true
        }
    }
};

if (!testEnv) {
    module.exports.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'));
}

if (prodEnv) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    );
} else {
    module.exports.devtool = '#source-map';
}


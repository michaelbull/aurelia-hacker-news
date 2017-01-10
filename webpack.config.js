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
            'aurelia-bootstrapper-webpack',
            'aurelia-event-aggregator',
            'aurelia-framework',
            'aurelia-history-browser',
            'aurelia-http-client',
            'aurelia-logging-console',
            'aurelia-templating-binding',
            'aurelia-templating-router',
            'aurelia-templating-resources',
            'firebase',
            'timeago.js'
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
        publicPath: '/aurelia-hacker-news/dist/',
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
                loader: 'file?name=images/[name].[ext]'
            },
            {
                test: /\.(eot|svg|ttf|otf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    },

    devServer: {
        stats: 'errors-only'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
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


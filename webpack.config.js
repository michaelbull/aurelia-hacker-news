var path = require('path'),
    webpack = require('webpack'),
    cssnano = require('cssnano'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    SassLintPlugin = require('sasslint-webpack-plugin'),
    AureliaWebPackPlugin = require('aurelia-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var prodEnv = (process.env.NODE_ENV === 'production');

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
            'nprogress',
            'timeago.js'
        ]
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },

    resolve: {
        extensions: [
            '.webpack.js',
            '.web.js',
            '.js',
            '.jsx',
            '.ts',
            '.tsx'
        ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        { loader: 'css-loader?sourceMap&importLoaders=1' },
                        { loader: 'postcss-loader?sourceMap' },
                        { loader: 'resolve-url-loader?sourceMap' },
                        { loader: 'sass-loader?sourceMap' }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            },
            {
                test: /\.(eot|svg|ttf|otf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
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
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                output: {
                    path: './'
                },
                tslint: {
                    emitErrors: true,
                    failOnHint: true,
                    fileOutput: {
                        dir: 'reports/tslint',
                        clean: true
                    }
                },
                postcss: [
                    /* merge media queries */
                    require('css-mqpacker')({
                        sort: true
                    }),

                    /* optimize css */
                    require('cssnano')({
                        autoprefixer: {
                            add: true,
                            remove: false
                        }
                    })
                ]
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'index.hbs'),
            favicon: './assets/favicon.ico'
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
        new webpack.optimize.CommonsChunkPlugin('vendor')
    ]
};

if (prodEnv) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
} else {
    module.exports.devtool = '#source-map';
}


let path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    SassLintPlugin = require('sasslint-webpack-plugin'),
    { AureliaPlugin } = require('aurelia-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

let prodEnv = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: {
        app: [
            'aurelia-bootstrapper'
        ]
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },

    resolve: {
        extensions: [
            '.webpack.js',
            '.web.js',
            '.js',
            '.jsx',
            '.ts',
            '.tsx'
        ],
        modules: [
            'src',
            'node_modules'
        ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader?sourceMap&importLoaders=1' },
                        { loader: 'postcss-loader?sourceMap' },
                        { loader: 'resolve-url-loader?sourceMap' },
                        { loader: 'sass-loader?sourceMap' }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader?name=images/[name].[ext]'
            },
            {
                test: /\.(eot|svg|ttf|otf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader?name=fonts/[name].[ext]'
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
                }
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'index.hbs'),
            favicon: './assets/favicon.ico'
        }),
        new AureliaPlugin(),
        new SassLintPlugin({
            configFile: 'sass-lint.yml',
            glob: 'style/**/*.s?(a|c)ss',
            failOnWarning: prodEnv,
            failOnError: prodEnv,
            ignorePlugins: [
                'extract-text-webpack-plugin'
            ]
        }),
        new ExtractTextPlugin('[name].css')
    ]
};

if (prodEnv) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
} else {
    module.exports.devtool = '#source-map';
}


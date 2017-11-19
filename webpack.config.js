const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let prodEnv = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: {
        app: [
            'aurelia-bootstrapper'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js'
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
                use: 'file-loader?name=images/[name]-[hash].[ext]'
            },
            {
                test: /\.(eot|svg|ttf|otf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader?name=fonts/[name]-[hash].[ext]'
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
        new AureliaPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: './assets/favicon.ico'
        }),
        new ExtractTextPlugin('[name]-[contenthash].css')
    ]
};

if (prodEnv) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
} else {
    module.exports.devtool = '#source-map';
}


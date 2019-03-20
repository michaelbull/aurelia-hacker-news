import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

const { AureliaPlugin } = require('aurelia-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let srcDir = path.resolve(__dirname, 'src');
let distDir = path.resolve(__dirname, 'dist');
let assetsDir = path.resolve(__dirname, 'assets');

function configure(env: any, args: any): webpack.Configuration {
    let styleLoaders: webpack.Loader[] = [
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                importLoaders: 1
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'resolve-url-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        }
    ];

    let config: webpack.Configuration = {
        entry: {
            app: 'aurelia-bootstrapper'
        },

        output: {
            path: distDir,
            filename: '[name]-[hash].js',
            chunkFilename: '[name]-[chunkhash].js'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader'
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                        args.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                        ...styleLoaders
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: 'file-loader?name=images/[name]-[hash].[ext]'
                }
            ]
        },

        resolve: {
            extensions: [
                '.js',
                '.ts'
            ],
            modules: [
                'node_modules',
                srcDir
            ]
        },

        plugins: [
            new AureliaPlugin(),
            new HtmlWebpackPlugin({
                template: 'index.ejs',
                favicon: path.resolve(assetsDir, 'favicon.ico')
            })
        ],

        stats: 'errors-only'
    };

    switch (args.mode) {
        case 'development':
            config.devtool = 'inline-source-map';
            break;

        case 'production':
            config.plugins!.push(new MiniCssExtractPlugin({
                filename: '[name]-[hash].css',
                chunkFilename: '[name]-[chunkhash].css'
            }));
            break;
    }

    return config;
}

export default configure;

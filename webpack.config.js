const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { DefinePlugin, LoaderOptionsPlugin, optimize: { UglifyJsPlugin } } = require('webpack');

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');
const assetsDir = path.resolve(__dirname, 'assets');

module.exports = (env) => {
    let styleRules = [
        { loader: 'css-loader?sourceMap&importLoaders=1' },
        { loader: 'postcss-loader?sourceMap' },
        { loader: 'resolve-url-loader?sourceMap' },
        { loader: 'sass-loader?sourceMap' }
    ];

    let config = {
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
                    use: env === 'production' ? ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: styleRules
                    }) : ['style-loader', ...styleRules]
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
                template: 'index.html',
                favicon: path.resolve(assetsDir, 'favicon.ico')
            }),
            new DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(env)
                }
            }),
            new LoaderOptionsPlugin({
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
            })
        ],

        devServer: {
            stats: 'errors-only'
        }
    };

    switch (env) {
        case 'development':
            config.devtool = 'cheap-module-eval-source-map';
            break;

        case 'production':
            config.plugins.push(new ExtractTextPlugin('[name]-[contenthash].css'));
            config.plugins.push(new UglifyJsPlugin());
            break;
    }

    return config;
};

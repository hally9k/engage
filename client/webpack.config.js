const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./config/path')
const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

const isAnalysis = Boolean(process.env.ANALYSIS)
const isDev = process.env.BUILD_ENV !== 'production'
const isTest = process.env.BUILD_ENV === 'test'

const vendor = [
    'classnames',
    'date-fns',
    'graphql-request',
    'history',
    'immutable',
    'jsonwebtoken',
    'normalizr',
    'react',
    'react-dom',
    'react-error-boundary',
    'react-immutable-hoc',
    'react-modal',
    'react-redux',
    'redux',
    'redux-first-router',
    'redux-first-router-link',
    'redux-graphql-subscriptions',
    'redux-immutablejs',
    'redux-logger',
    'redux-observable',
    'redux-raven-middleware',
    'reselect'
]

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.[hash].js',
        minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
        template: paths.appHtmlTemplate
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: `"${process.env.NODE_ENV}"`,
            BUILD_ENV: `"${process.env.BUILD_ENV}"`,
            PORT: process.env.PORT
        }
    }),
    new ExtractTextPlugin({
        disable: isDev,
        filename: 'bundle.[hash].css'
    })
]

if (isAnalysis) plugins.push(new BundleAnalyzerPlugin())

if (!isDev) plugins.push(new MinifyPlugin())

module.exports = {
    devtool: isDev ? 'source-map' : 'inline-cheap-source-map',
    entry: {
        app: ['babel-polyfill', 'react-hot-loader/patch', paths.appIndexJs],
        vendor
    },
    output: {
        filename: 'app.[chunkhash].js',
        path: paths.appBuild,
        publicPath: '/'
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: { sourceMap: true }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                sourceMap: true,
                                localIdentName: '[name]-[local]-[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    ctx: { isTest },
                                    path: paths.postCssConfig
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            }
        ]
    },
    resolve: {
        modules: [paths.appSrc, 'node_modules'],
        extensions: ['.js', '.jsx', '.css', '.graphql']
    },
    devServer: {
        compress: true,
        contentBase: paths.appPublic,
        https: false,
        noInfo: true,
        publicPath: '/',
        watchOptions: {
            ignored: /node_modules/
        },
        historyApiFallback: true
    }
}

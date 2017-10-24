const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./config/path')
const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.BUILD_ENV !== 'production'
const isTest = process.env.BUILD_ENV === 'test'

const plugins = [
    new HtmlWebpackPlugin({
        template: paths.appHtmlTemplate
    }),
    new webpack.DefinePlugin({
        BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
        PORT: JSON.stringify(process.env.PORT)
    }),
    new ExtractTextPlugin({
        disable: isDev,
        filename: isDev ? 'bundle.css' : 'bundle.[hash].css'
    })
]

if (!isDev) plugins.push(new MinifyPlugin())

module.exports = {
    devtool: isDev ? 'source-map' : 'inline-cheap-source-map',
    entry: {
        app: ['babel-polyfill', 'react-hot-loader/patch', paths.appIndexJs]
    },
    output: {
        filename: isDev ? 'bundle.js' : 'bundle.[hash].js',
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

const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./config/path')
const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')

const isDev = process.env.BUILD_ENV !== 'production'

module.exports = {
    devtool: isDev ? 'source-map' : 'inline-cheap-source-map',
    entry: {
        app: ['babel-polyfill', 'react-hot-loader/patch', paths.appIndexJs]
    },
    output: {
        filename: 'bundle.[hash].js',
        path: paths.appBuild,
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.appHtmlTemplate
        }),
        new webpack.DefinePlugin({
            BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
            PORT: JSON.stringify(process.env.PORT)
        }),
        isDev ? null : new MinifyPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader:
                    'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]'
                // options: {
                //     config: {
                //         path: `${paths.appRoot}/postcss.config.js`
                //     }
                // }
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
        hot: true,
        https: false,
        noInfo: true,
        publicPath: '/',
        watchOptions: {
            ignored: /node_modules/
        },
        historyApiFallback: true
    }
}

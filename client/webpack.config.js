const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./config/path')
const webpack = require('webpack')

module.exports = {
    devtool: 'source-map', // 'inline-cheap-source-map',
    entry: {
        app: ['babel-polyfill', 'react-hot-loader/patch', paths.appIndexJs],
    },
    output: {
        filename: 'bundle.js',
        path: paths.appBuild,
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.appHtmlTemplate,
        }),
        new webpack.DefinePlugin({
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
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
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'raw-loader',
            },
        ],
    },
    resolve: {
        modules: [paths.appSrc, 'node_modules'],
        extensions: ['.js', '.jsx', '.css', '.graphql'],
    },
    devServer: {
        compress: true,
        contentBase: paths.appPublic,
        hot: true,
        https: false,
        noInfo: true,
        publicPath: '/',
        watchOptions: {
            ignored: /node_modules/,
        },
        historyApiFallback: true,
    },
}

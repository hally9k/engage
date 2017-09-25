import HtmlWebpackPlugin from 'html-webpack-plugin'
import paths from './config/path'
import webpack from 'webpack'

const isDev = process.env.NODE_ENV !== 'production'

export default {
    devtool: 'inline-cheap-source-map',
    entry: paths.appIndexJs,
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
        host: 'localhost',
        compress: true,
        contentBase: paths.appPublic,
        hot: false,
        https: false,
        noInfo: true,
        publicPath: '/',
        watchOptions: {
            ignored: /node_modules/,
        },
        historyApiFallback: true,
        disableHostCheck: isDev,
        useLocalIp: isDev,
    },
}

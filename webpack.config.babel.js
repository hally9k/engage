import HtmlWebpackPlugin from 'html-webpack-plugin'
import paths from './config/path'

export default {
    entry: paths.appIndexJs,
    output: paths.appBuild,
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.appHtmlTemplate
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
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
        modules: [paths.appSrc, 'node_modules']
    },
    devServer: {
        compress: true,
        contentBase: paths.appPublic,
        historyApiFallback: true,
        hot: false,
        https: true,
        noInfo: true,
        publicPath: '/',
        watchOptions: {
            ignored: /node_modules/
        }
    }
}

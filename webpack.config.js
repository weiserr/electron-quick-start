var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =
    {
        entry: "./app/demo.ts",
        output: {
            path: __dirname + "/dist",
            filename: "bundle.[hash].js"
        },

        resolve: {
            extensions: ['', '.ts', '.js']
        },

        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loaders: ['awesome-typescript-loader']
                },
                {
                    test: /\.html$/,
                    loader: 'html'
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file?name=assets/[name].[hash].[ext]'
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html'
            })
        ],

        target: 'web'
        // target: 'electron-renderer'
    }
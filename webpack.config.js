var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =
    {
        entry: "./app/demo.js",
        output: {
            path: __dirname + "/dist",
            filename: "bundle.js"
        },

        resolve: {
            extensions: ['', '.js']
        },

        module: {
            loaders: [
                {
                    test: /\.html$/,
                    loader: 'html'
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file?name=assets/[name].[ext]'
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html'
            })
        ]
    }
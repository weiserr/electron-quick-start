var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = 
{
    context: __dirname,
    entry: "./app/demo.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}
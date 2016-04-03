var webpack = require("webpack");
var BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
    entry: "./public/js/main.js",
    output: {
        path: __dirname + '/public/js/',
        filename: "bundle.js"
    },
    plugins: [
        new BowerWebpackPlugin({
            excludes: /.*\.less/
        }),
        new webpack.ProvidePlugin({
            $:      "jquery",
            jQuery: "jquery"
        })
    ]
};
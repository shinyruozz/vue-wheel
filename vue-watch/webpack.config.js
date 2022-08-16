const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");
module.exports = {
    mode: "development",
    devServer: {
        open: true,
        hot: true,
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            options: {
                presets: ["env"],
            },
        }, ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "src/index.html"),
        }),
        new Webpack.HotModuleReplacementPlugin(),
    ],

    output: {
        filename: "main.js",
        path: resolve(__dirname, "dist"),
    },
};
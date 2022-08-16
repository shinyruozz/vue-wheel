const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: resolve(__dirname, "src/index.js"),
    output: {
        filename: "main.js",
        path: resolve(__dirname, "dist"),
    },
    devServer: {
        open: true,
        hot: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "src/index.html"),
        }),
        new Webpack.HotModuleReplacementPlugin(),
    ],
};
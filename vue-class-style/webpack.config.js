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
    module: {
        rules: [{
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["env"],
                },
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "src/index.html"),
        }),
        new Webpack.HotModuleReplacementPlugin(),
    ],
};
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "development",
    entry: "./src/app.js",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        modules: [path.resolve(__dirname, "source"), "node_modules"],
    },
    devtool: "source-map",
    devServer: {
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html"),
        }),
    ],
};
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        watchContentBase: true
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        minimize: true
    },
    watch: true,    // otomatis nyala kalau pakai webpack-dev-server
    entry: {
        bundle: "./src/index.js",
        main: "./src/js/main.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./js/[name].js"
    },
    module: {
        rules: [
            { test: /\.css$/, use: [ { loader: MiniCssExtractPlugin.loader, options: {publicPath: '../'}}, 'css-loader' ] },
            { test: /\.(gif|png|jpe?g)$/, use: [ { loader: 'file-loader', options: { name: '[name].[ext]', outputPath: './assets/images/' } } ] }
        ]
    },
    plugins: [ new MiniCssExtractPlugin({ filename: './css/bundle.css' }) ],
}
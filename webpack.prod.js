const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

//Todo esto se compilará en el Build , añadiendo el contenido necesario dentro del directorio dist (html, css...)
module.exports = {

    mode: "production",

    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Blackjack',
            filename: 'index.html', //Es el nombre que quiero que le ponga - fullhash va a ayudar a que no se mantenga en caché el archivo tras cada despliegue - SOLO EN ENTORNO DESPLIEGUE, EN DESARROLLO NO ES NECESARIO
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css', //Es el nombre que quiero que le ponga - fullhash va a ayudar a que no se mantenga en caché el archivo tras cada despliegue - SOLO EN ENTORNO DESPLIEGUE, EN DESARROLLO NO ES NECESARIO
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
}
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

//Todo esto se compilará en el Build , añadiendo el contenido necesario dentro del directorio dist (html, css...)
module.exports = {

    mode: 'development',

    output: {
        clean: true
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
            }
        ]
    },

    optimization: {},

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Blackjack',
            filename: 'index.html', //Es el nombre que quiero que le ponga - fullhash va a ayudar a que no se mantenga en caché el archivo tras cada despliegue - SOLO EN ENTORNO DESPLIEGUE, EN DESARROLLO NO ES NECESARIO
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css', //Es el nombre que quiero que le ponga - fullhash va a ayudar a que no se mantenga en caché el archivo tras cada despliegue - SOLO EN ENTORNO DESPLIEGUE, EN DESARROLLO NO ES NECESARIO
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
}
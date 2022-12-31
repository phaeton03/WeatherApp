const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: { main: './src/weather.js' },
    output: {
        /** название моей текущей директории плюс dist */
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
        environment: {
            arrowFunction: false
        }
    },
    module: {
        rules: [
            {
                test: /\.njs$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/weather.html"
    })],
};
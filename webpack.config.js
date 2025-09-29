const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Last updated by Brett Balquist to get audio
module.exports = {
    mode: 'production',
    entry: './src/ts/index.ts',
    output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
    extensions: ['.ts', '.tsx'],
    },
    module: {
    rules: [
        {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        },
        {
        test: /\.mp3?$/i,
        type: "asset/resource",
        generator: {
            filename: "assets/sounds/[name][ext]"
        }
        },
        {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
        }
    ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            filename: 'index.html'
        })
    ]
};

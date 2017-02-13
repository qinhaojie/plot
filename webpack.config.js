var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
    entry: {

        app: ["./app/js/app.js"],

        vendor: ['jquery', 'd3','mathjs']
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/js/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"

    },
    devServer: {
        historyApiFallback: true,
        //hot: true,
        inline: true,
        
        contentBase: 'app/',
    },
    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            filename: 'vendor.js',
            name: 'vendor'
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            d3: 'd3',

            'math':'mathjs'
        })

    ],
    devtool: 'inline-source-map',

    module: {

        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: APP_PATH,
                query: {
                    presets: ['es2015']
                }
            }

        ]
    }
};
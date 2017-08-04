var webpack =require("webpack");
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename:'main.css'
});

var DIST_DIR = path.resolve(__dirname,"dist");
var SRC_DIR = path.resolve(__dirname,"src");

var config = {
    devtool: "eval-source-map", //allows to have debug symbols
    devServer: {
        historyApiFallback: true
    },
    entry: SRC_DIR + "/app/index.js",
    output:{
        path: DIST_DIR + "/",
        filename:"bundle.js", 
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader','sass-loader'] //respect this order (executed inversely)
                })
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'[name].[ext]',
                        outputPath:'images/',
                       // publicPath:'images/'
                    }
                }]
            },
            {
                test:/\.html$/,
                use:['html-loader']
            },
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query:{
                    presets:["react","es2015","stage-2"]
                }
            }
        ]
    }, 
    plugins:[ 
            new webpack.ProvidePlugin({}),
            extractPlugin,
            new HtmlWebpackPlugin({
                template:'src/index.html',
                favicon: 'src/app/images/favicon.ico'
            }),
            new CleanWebpackPlugin(['dist'])
    ]
};

module.exports = config;
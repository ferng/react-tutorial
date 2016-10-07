var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        app: ["./example.jsx"]
    },
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [
                        "es2015",
                        "react"
                    ]
                }
            }
        ]
    },
    proxy: {
        '/api': {
            target: 'http://localhost:3000/api'
        }
    }
};
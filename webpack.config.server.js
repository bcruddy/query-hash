'use strict';

const env = process.env.NODE_ENV || 'dev';

module.exports = {
    entry: './src/index.js',
    output: {
        path: './',
        filename: 'query-hash.js',
        libraryTarget: 'umd',
        library: 'QueryHash'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|test)/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    comments: 'false'
                }
            }
        ]

    }
};

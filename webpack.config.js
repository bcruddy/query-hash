'use strict';

const env = process.env.NODE_ENV || 'dev';

module.exports = {
    entry: './src/index.js',
    output: {
        path: `${__dirname}/dist`,
        filename: env === 'dev' ? 'query-hash.js' : 'query-hash.min.js',
        libraryTarget: 'var',
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

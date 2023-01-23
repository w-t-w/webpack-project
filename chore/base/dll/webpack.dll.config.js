const path = require('path');
const webpack = require('webpack');

const OUTPUT_DIR = path.resolve(process.cwd(), './build/vendors');
const MANIFEST_DIR = path.resolve(OUTPUT_DIR, 'manifest.json');

const dllConfig = {
    mode: 'production',
    entry: [
        'react',
        'react-dom',
        'redux',
        'react-redux',
        'redux-thunk',
        'redux-logger',
    ],
    output: {
        publicPath: '',
        path: OUTPUT_DIR,
        filename: '[name].js',
        chunkFilename: '[name].js',
        library: '[name]_[fullhash]',
    },
    stats: {
        preset: 'minimal',
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            }],
        }],
    },
    plugins: [
        new webpack.DllPlugin({
            context: process.cwd(),
            name: '[name]_[fullhash]',
            path: MANIFEST_DIR,
        }),
    ],
};

module.exports = dllConfig;

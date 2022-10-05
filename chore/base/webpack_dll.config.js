const webpack = require('webpack');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const MANIFEST_DIR = path.resolve(process.cwd(), 'dist');

const dllConfig = {
    mode: 'production',
    entry: [
        'react',
        'react-dom'
    ],
    stats: {
        preset: 'minimal'
    },
    output: {
        publicPath: '',
        path: DIST_DIR,
        filename: '[name].[fullhash].js',
        library: '[name]_[fullhash]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: '[name]_[fullhash]',
            path: path.join(MANIFEST_DIR, 'manifest.json')
        })
    ]
};

module.exports = dllConfig;
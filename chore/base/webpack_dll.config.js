const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const OUTPUT_DIR = path.resolve(process.cwd(), 'build');
const MANIFEST_DIR = path.resolve(process.cwd(), 'build', 'vendors');

const dllConfig = {
    mode: 'production',
    entry: {
        vendors: [
            'react',
            'react-dom',
        ],
    },
    stats: {
        preset: 'minimal',
    },
    output: {
        publicPath: '',
        path: OUTPUT_DIR,
        filename: 'vendors/[name].dll.js',
        library: '[name]_[fullhash]',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            context: process.cwd(),
            name: '[name]_[fullhash]',
            path: path.resolve(MANIFEST_DIR, 'manifest.json'),
        }),
    ],
};

module.exports = dllConfig;

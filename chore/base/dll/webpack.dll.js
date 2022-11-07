const webpack = require('webpack');
const path = require('path');

const OUTPUT_DIR = path.resolve(process.cwd(), './build/vendors');
const MANIFEST_DIR = path.resolve(process.cwd(), OUTPUT_DIR, 'manifest.json');

const dllConfig = {
    mode: 'production',
    entry: [
        'react',
        'react-dom',
        'redux',
        'react-redux',
    ],
    output: {
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: OUTPUT_DIR,
        library: '[name]_[fullhash]',
    },
    stats: {
        preset: 'minimal',
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

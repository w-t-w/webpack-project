const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const NextPlugin = require('../base/plugins/next');

const baseConfig = require('../base/webpack.base');

module.exports = function prod(env) {
    const { plugins: { bundleAnalyzer } = {} } = env;
    const prodConfig = {
        mode: 'production',
        target: 'web',
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    '**/*',
                    '!vendors/**',
                ],
            }),
            bundleAnalyzer ? new BundleAnalyzerPlugin() : new NextPlugin(),
        ],
    };
    return merge(baseConfig(env), prodConfig);
};

const { merge } = require('webpack-merge');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = require('../base/webpack_base.config');

module.exports = (env) => {
    const { params: { plugins: { bundleAnalyzer = false } = {} } = {} } = env;
    const prodConfig = {
        target: 'web',
        mode: 'production',
        plugins: [].concat(bundleAnalyzer ? [new BundleAnalyzer()] : []),
    };
    return merge(baseConfig(env), prodConfig);
};

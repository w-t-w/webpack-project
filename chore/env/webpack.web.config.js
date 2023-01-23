const { merge } = require('webpack-merge');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseConfig = require('../base/webpack.base.config');
const { NextPlugin } = require('../base/plugin');
const { prompt: { envEnum } } = require('../config');

module.exports = ({ env, mobile }) => {
    const webConfig = {
        target: 'web',
        plugins: [
            env === envEnum.development ? new BundleAnalyzerPlugin() : new NextPlugin(),
        ],
    };
    return merge(baseConfig({ env, mobile }), webConfig);
};

const { merge } = require('webpack-merge');

const baseConfig = require('../base/webpack_base.config');

const prodConfig = {
    target: 'web',
    mode: 'production',
};

module.exports = merge(baseConfig, prodConfig);

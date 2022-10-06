const { merge } = require('webpack-merge');
const open = require('open');

const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const EslintWebpackPlugin = require('eslint-webpack-plugin');

const baseConfig = require('../base/webpack_base.config');

const PORT = 7777;

/**
 * 开发环境 webpack 配置
 * @type {{}}
 */
const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        host: 'localhost',
        port: PORT,
        hot: true,
        historyApiFallback: true,
        open: {
            app: {
                name: open.apps.chrome,
            },
        },
        proxy: {
        },
    },
    plugins: [
        new BundleAnalyzer(),
        new EslintWebpackPlugin(),
    ],
};

module.exports = merge(baseConfig, devConfig);

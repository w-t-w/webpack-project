const open = require('open');
const path = require('path');
const { merge } = require('webpack-merge');

const EslintWebpackPlugin = require('eslint-webpack-plugin');

const baseConfig = require('../base/webpack_base.config');

const STATIC_DIR = path.resolve(process.cwd(), './build');

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
        static: STATIC_DIR,
        open: {
            app: {
                name: open.apps.chrome,
            },
        },
        proxy: {
        },
    },
    plugins: [
        new EslintWebpackPlugin(),
    ],
};

module.exports = (env) => merge(baseConfig(env), devConfig);

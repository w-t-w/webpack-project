const { merge } = require('webpack-merge');
const { resolve } = require('path');
const open = require('open');

const baseConfig = require('../base/webpack.base');

const STATIC_DIR = resolve(process.cwd(), './build');
const PORT = 8888;

module.exports = function dev(env) {
    const { env: _env = '' } = env;
    const devConfig = {
        mode: 'development',
        devtool: 'cheap-module-source-map',
        target: _env,
        devServer: {
            host: 'localhost',
            hot: true,
            port: PORT,
            open: {
                app: {
                    name: open.apps.chrome,
                },
            },
            static: STATIC_DIR,
            compress: true,
            historyApiFallback: true,
            proxy: {},
        },
    };
    return merge(baseConfig(env), devConfig);
};

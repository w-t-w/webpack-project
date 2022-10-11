const inquirer = require('inquirer');
const glob = require('glob-all');
const { exec } = require('shelljs');

const prompt = inquirer.createPromptModule();

const isMobile = 'mobile';
const development = 'development';

const manifestFile = glob.sync(['./build/vendors/*.json']);

// dll 配置
const dll = (manifestFile && manifestFile.length > 0) ? '' : 'webpack --config=./chore/base/webpack_dll.config.js';

// 所属环境
const env = {
    development: 'webpack-dev-server',
    production: 'webpack',
};

// webpack 配置文件
const config = {
    dev_base: '--config=./chore/buildChore/webpack_dev.config.js',
    's/mpa': {
        development: '--target=web',
        production: '--config=./chore/buildChore/webpack_prod.config.js --env params.plugins.bundleAnalyzer',
    },
    node: {
        development: '--target=node',
        production: '--config=./chore/buildChore/webpack_ssr.config.js',
    },
};

// webpack 移动端适配文件
const mobile = {
    rem: '--env params.mobile="rem"',
    vw: '--env params.mobile="vw"',
};

const doShell = async () => {
    const command = [];
    const result = await prompt([{
        type: 'list',
        message: '请选择 webpack 打包的所属环境:',
        choices: [
            'development',
            'production',
        ],
        name: 'env',
        filter(value) {
            return value.toLowerCase();
        },
    }, {
        type: 'list',
        message: '请选择 webpack 需要打包的方式:',
        name: 'webpack',
        choices: [
            'S/MPA',
            'Node',
            'Electron',
            'Offline',
            'mobile',
        ],
        filter(value) {
            return value.toLowerCase();
        },
    }]);
    // eslint-disable-next-line
    const _env = result.env;
    // eslint-disable-next-line
    const _webpack = result.webpack;
    // eslint-disable-next-line
    let _mobile = '';
    // eslint-disable-next-line
    if (_webpack === isMobile) {
        const method = await prompt([{
            name: 'mobile',
            type: 'list',
            message: '请选择移动端分辨率适配策略:',
            choices: [
                'rem',
                'vw',
            ],
            filter(value) {
                return value.toLowerCase();
            },
        }]);
        _mobile = method.mobile;
    }
    // eslint-disable-next-line
    const webpackConfig = config[_webpack] || config['s/mpa'];
    // eslint-disable-next-line
    command.push(dll, [env[_env], _env === development ? config.dev_base : '', webpackConfig[_env], _mobile ? mobile[_mobile] : ''].join(' '));
    !dll && command.shift();
    exec(command.join(' && '));
};

doShell();

const inquirer = require('inquirer');
const {exec} = require('shelljs');

const prompt = inquirer.createPromptModule();

// dll 配置
const dll = 'webpack --config=./chore/base/webpack_dll.config.js';

// 所属环境
const env = {
    development: 'webpack-dev-server',
    production: 'webpack'
}

// webpack 配置文件
const config = {
    ['dev_base']: '--config=./chore/buildChore/webpack_dev.config.js',
    ['s/mpa']: {
        development: '--target=web',
        production: '--config=./chore/buildChore/webpack_prod.config.js'
    },
    ['node']: {
        development: '--target=node',
        production: '--config=./chore/buildChore/webpack_ssr.config.js'
    }
};

const doShell = async () => {
    const command = [];
    const result = await prompt([{
        type: 'list',
        message: '请选择 webpack 打包的所属环境:',
        choices: [
            'development',
            'production'
        ],
        name: 'env',
        filter(value) {
            return value.toLowerCase();
        }
    }, {
        type: 'list',
        message: '请选择 webpack 需要打包的方式:',
        name: 'webpack',
        choices: [
            'S/MPA',
            'Node',
            'Electron',
            'Offline'
        ],
        filter(value) {
            return value.toLowerCase();
        }
    }]);
    const _env = result['env'],
        _webpack = result['webpack'];
    command.push(dll, [env[_env], _env === 'development' ? config['dev_base'] : '', config[_webpack][_env]].join(' '));
    exec(command.join('&&'), (err, result) => {
        console.log(err, result);
    });
};

doShell();






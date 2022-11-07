const { existsSync } = require('fs');
const { resolve } = require('path');
const { exec } = require('shelljs');

const { createPrompt, asyncGenerator } = require('./utils');
const {
    envTypeChoices,
    choreTypeChoices,
    mobileTypeChoices,
    baseShell,
    envTypeChoreTypeShell,
    mobileTypeShell,
} = require('./constants');

const VENDORS_DIR = resolve(process.cwd(), './build/vendors');

const envType = function envType() {
    return createPrompt({
        name: 'envType',
        message: '请选择要实行构建打包的环境:',
        choices: envTypeChoices,
    });
};

const choreType = function choreType() {
    return createPrompt({
        name: 'choreType',
        message: '请选择要实行构建打包的项目类型:',
        choices: choreTypeChoices,
    });
};

const mobileType = function mobileType() {
    return createPrompt({
        name: 'mobileType',
        message: '请选择移动端分辨率适配的策略:',
        choices: mobileTypeChoices,
    });
};

const resultShellArr = [];
const envShellArr = [];

function run() {
    return new Promise((resolveResult) => {
        asyncGenerator(function* generator() {
            const { envType: envTypeChoice } = yield envType();
            if (!existsSync(VENDORS_DIR)) {
                resultShellArr.push(baseShell);
            }
            const { choreType: choreTypeChoice } = yield choreType();
            const selectEnvShell = envTypeChoreTypeShell[envTypeChoice];
            envShellArr.push(`${selectEnvShell.base}${selectEnvShell.type(choreTypeChoice)}`);
            if (choreTypeChoice === 'mobile') {
                const { mobileType: mobileTypeChoice } = yield mobileType();
                envShellArr.push(mobileTypeShell[mobileTypeChoice]);
            }
            resultShellArr.push(envShellArr.join(' '));
            resolveResult(resultShellArr.join(' && '));
        });
    });
}

run().then((result) => {
    exec(result);
});

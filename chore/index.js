const inquirer = require('inquirer');
const shelljs = require('shelljs');
const path = require('path');

const util = require('./util');
const config = require('./config');

const VENDORS_DIR = path.resolve(process.cwd(), './build/vendors');
const MANIFEST_DIR = path.resolve(VENDORS_DIR, './manifest.json');

// 环境互动配置
const { envConfig } = config.prompt;
// 环境互动选项
const envChoices = Object.keys(envConfig);

// 平台互动配置
const { platformConfig } = config.prompt;
// 平台互动选项
const platformChoices = Object.keys(platformConfig);

// 移动端分辨率策略互动配置
const { strategyConfig } = config.prompt;
// 移动端分辨率适配策略互动选项
const strategyChoices = Object.keys(strategyConfig);

const prompt = util.thunk.promptThunk(inquirer.createPromptModule());
const { Command } = util;

// 环境互动
const env = () => prompt({ message: '请选择您项目所要启动的环境:', choices: envChoices });
// 平台互动
const platform = () => prompt({ message: '请您选择项目所要启动的平台:', choices: platformChoices });
// 移动端分辨率适配策略互动
const strategy = () => prompt({ message: '请您选择项目所要使用的移动端分辨率适配策略:', choices: strategyChoices });

util.thunk.promiseRun(function* generator() {
    const commandClass = new Command();
    yield commandClass.commonCommand(VENDORS_DIR, MANIFEST_DIR, 'yarn run dll');
    yield* commandClass.combineCommand([[env, envConfig], [platform, platformConfig], [strategy, strategyConfig]]);
    return commandClass.exec();
}).then((command) => {
    shelljs.exec(command);
});

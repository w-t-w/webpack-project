/**
 * inquirer 互动配置
 * @type {{filter(*): *, name: string, type: string}}
 */
const config = {
    type: 'list',
    name: 'prompt',
    filter(value) {
        return value.toLowerCase();
    },
};

/**
 * 环境枚举配置
 * @type {{development: string, production: string}}
 */
const envEnum = {
    development: 'development',
    production: 'production',
};

/**
 * 移动端分辨率枚举配置
 * @type {{vw: string, rem: string}}
 */
const mobileEnum = {
    rem: 'rem',
    vw: 'vw/vh',
};

/**
 * 环境配置
 * @type {{}}
 */
const envConfig = {
    development: {
        command: 'webpack-dev-server',
        key: 'env',
        value: 'env=development',
        hasNext: true,
    },
    production: {
        command: 'webpack',
        key: 'env',
        value: 'env=production',
        hasNext: true,
    },
};

/**
 * 平台配置
 * @type {{}}
 */
const platformConfig = {
    'S/MPA': {
        key: 'config',
        value: './chore/env/webpack.web.config.js',
    },
    SSR: {
        key: 'config',
        value: './chore/env/webpack.ssr.config.js',
    },
    Electron: {
        key: 'config',
        value: './chore/env/webpack.electron.config.js',
    },
    Mobile() {
        return {
            ...this['S/MPA'],
            hasNext: true,
        };
    },
};

/**
 * 移动端策略配置
 * @type {{}}
 */
const strategyConfig = {
    rem: {
        key: 'env',
        value: 'mobile=rem',
    },
    'vw/vh': {
        key: 'env',
        value: 'mobile=vw/vh',
    },
};

module.exports = {
    config,
    envConfig,
    platformConfig,
    strategyConfig,
    envEnum,
    mobileEnum,
};

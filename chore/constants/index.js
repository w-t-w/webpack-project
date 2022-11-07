// 构建打包的环境
const envTypeChoices = [
    'development',
    'production',
];

// 构建打包的项目类型
const choreTypeChoices = [
    'S/MPA',
    'SSR',
    'Electron',
    'Mobile',
];

// 移动端分辨率适配的策略
const mobileTypeChoices = [
    'rem',
    'vw/vh',
];

// 公有 shell 命令
const baseShell = `webpack --config=${process.cwd()}/chore/base/dll/webpack.dll.js`;

// 构建打包项目环境以及类型的 shell 命令
const envTypeChoreTypeShell = {
    development: {
        base: `webpack-dev-server --config=${process.cwd()}/chore/type/webpack.dev.js`,
        type(choreType) {
            switch (choreType) {
            case 's/mpa':
            case 'mobile':
                return ' --env env=web';
            case 'ssr':
                return ' --env env=node';
            case 'electron':
                return ' --env env=electron-renderer';
            default:
                return '';
            }
        },
    },
    production: {
        base: `webpack --config=${process.cwd()}/chore/type/`,
        type(choreType) {
            switch (choreType) {
            case 's/mpa':
            case 'mobile':
                return 'webpack.prod.js --env plugins.bundleAnalyzer=true';
            case 'ssr':
                return 'webpack.ssr.js';
            case 'electron':
                return 'webpack.electron.js';
            default:
                return '';
            }
        },
    },
};

// 移动端分辨率适配的 shell 命令
const mobileTypeShell = {
    rem: '--env mobile=rem',
    'vw/vh': '--env mobile=vw/vh',
};

module.exports = {
    envTypeChoices,
    choreTypeChoices,
    mobileTypeChoices,
    baseShell,
    envTypeChoreTypeShell,
    mobileTypeShell,
};

const glob = require('glob');
const { resolve, join } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = {
    // 移动端分辨率适配
    mobileLoader(mobile) {
        const emptyLoader = {
            loader: { loader: resolve(__dirname, '../loaders/next.js') },
            options: {},
        };
        let resultLoader = null;
        switch (mobile) {
        case 'rem':
            resultLoader = {
                loader: {
                    loader: 'px2rem-loader',
                    options: {
                        remUnit: 75,
                        remPrecision: 8,
                    },
                },
            };
            break;
        case 'vw/vh':
            resultLoader = {
                options: {
                    postcssOptions: {
                        plugins: {
                            'postcss-px-to-viewport': {
                                unitToConvert: 'px',
                                viewportUnit: 'vw',
                                viewportWidth: 750,
                                unitPrecision: 8,
                            },
                        },
                    },
                },
            };
            break;
        default:
            resultLoader = {};
            break;
        }
        return Object.assign(emptyLoader, resultLoader);
    },
    // s/mpa 页面配置
    setSMPA(mobile) {
        const entry = {};
        const htmlWebpackPlugin = [];
        const searchTemplateRegExp = /src\/?(.*)\/index\.ejs/;
        const templateFilesArr = glob.sync(resolve(process.cwd(), './src/**/index.ejs'));
        templateFilesArr.forEach((templateFile) => {
            const searchTemplateResult = searchTemplateRegExp.exec(templateFile);
            const chunkValue = searchTemplateResult[0].replace('index.ejs', 'index.js');
            const chunkValueLength = chunkValue.length;
            const path = searchTemplateResult[1];
            const pathArr = path.split('/');
            const repeatLength = pathArr.length;
            const pathToChunk = pathArr.join('-');

            entry[pathToChunk || 'index'] = chunkValue.padStart(chunkValueLength + 2, './');
            htmlWebpackPlugin.push(new HtmlWebpackPlugin({
                publicPath: path ? '../'.repeat(repeatLength) : './',
                filename: `${path ? `${path}/` : ''}index.html`,
                template: join(process.cwd(), searchTemplateResult[0]),
                chunks: ['commons', pathToChunk || 'index'],
                inject: 'body',
                minify: true,
                templateParameters: {
                    vendors: `${path ? '../'.repeat(repeatLength) : './'}vendors/main.js`,
                    mobile,
                },
            }));
        });

        return {
            entry,
            htmlWebpackPlugin,
        };
    },
};

module.exports = utils;

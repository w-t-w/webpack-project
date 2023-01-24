const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const templateAbsolutePath = path.resolve(process.cwd(), './build');

const sMpa = (templateParams) => {
    const entry = {};
    const htmlWebpackPlugin = [];
    const templatePaths = glob.sync(path.resolve(process.cwd(), './src/**/index.ejs'));
    const entryPoint = /src[/|\\]?(.*)[/|\\]index/;
    for (const templatePath of templatePaths) {
        // eslint-disable-next-line
        let [entryValue, entryKey] = entryPoint.exec(templatePath);
        const isEntryRoot = !entryKey;
        entryKey = entryKey || 'index';
        const entryKeyArr = entryKey.split(/[/|\\]/g);
        const entryKeyTransform = entryKeyArr.join('_');
        const entryValueTransform = `./${entryValue}.js`;
        const hackPath = isEntryRoot ? './' : '../'.repeat(entryKeyArr.length);
        entry[entryKeyTransform] = entryValueTransform;
        htmlWebpackPlugin.push(new HtmlWebpackPlugin({
            publicPath: hackPath,
            filename: `${templateAbsolutePath}/${isEntryRoot ? '' : `${entryKey}/`}index.html`,
            template: templatePath,
            chunks: ['common', entryKeyTransform],
            inject: 'body',
            minify: true,
            templateParameters: {
                hackPath,
                ...templateParams,
            },
        }));
    }
    return {
        entry,
        htmlWebpackPlugin,
    };
};

module.exports = sMpa;

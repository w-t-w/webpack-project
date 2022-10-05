const path = require('path');
const glob = require('glob');
const fs = require('fs');

const SRC_DIR = path.resolve(process.cwd(), 'src');
const BASE_TEMPLATE_DIR = path.resolve(process.cwd(), 'src', 'index.ejs');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const setS_MPA = () => {
    const entry = {};
    let htmlWebpackPlugin = [];
    const pagesPoint = /src[\/|\\]?(.*)[\/|\\].*\.js/;

    const pages = glob.sync(`${SRC_DIR}/**/index.js`);

    pages.forEach(item => {
        let point = null,
            entryFile = null,
            templateFile = null;

        if (pagesPoint.test(item)) {
            entryFile = item.match(pagesPoint)[0];
            point = item.match(pagesPoint)[1];
            templateFile = path.resolve(process.cwd(), 'src', point, 'index.ejs');

            entryFile = path.relative(process.cwd(), entryFile);
            point = point.split(/[\/|\\]/g).join('_');
            templateFile = fs.existsSync(templateFile) ? templateFile : BASE_TEMPLATE_DIR;

            entry[point || 'index'] = `./${entryFile}`;
            htmlWebpackPlugin = [...htmlWebpackPlugin, new HtmlWebpackPlugin({
                publicPath: '.',
                template: templateFile,
                filename: `${point || 'index'}.html`,
                chunks: ['commons', point || 'index'],
                minify: {
                    collapseWhitespace: true,
                    keepClosingSlash: true,
                    removeComments: false,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                },
                inject: 'body'
            })];
        }
    });

    return {
        entry,
        htmlWebpackPlugin
    };
};

module.exports = setS_MPA();
const path = require('path');
const glob = require('glob');
const fs = require('fs');

const SRC_DIR = path.resolve(process.cwd(), 'src');
const BASE_TEMPLATE_DIR = path.resolve(process.cwd(), 'src', 'index.ejs');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line
const setS_MPA = (templateParameters) => {
    const entry = {};
    let htmlWebpackPlugin = [];
    // eslint-disable-next-line
    const pagesPoint = /src[\/|\\]?(.*)[\/|\\].*\.js/;

    const pages = glob.sync(`${SRC_DIR}/**/index.js`);

    pages.forEach((item) => {
        let point = null;
        let entryFile = null;
        let templateFile = null;

        if (pagesPoint.test(item)) {
            // eslint-disable-next-line
            entryFile = item.match(pagesPoint)[0];
            // eslint-disable-next-line
            point = item.match(pagesPoint)[1];
            templateFile = path.resolve(process.cwd(), 'src', point, 'index.ejs');

            entryFile = path.relative(process.cwd(), entryFile);
            // eslint-disable-next-line
            point = point.split(/[\/|\\]/g).join('_');
            templateFile = fs.existsSync(templateFile) ? templateFile : BASE_TEMPLATE_DIR;

            entry[point || 'index'] = `./${entryFile}`;
            htmlWebpackPlugin = [...htmlWebpackPlugin, new HtmlWebpackPlugin({
                // todo better resolve solution
                publicPath: point ? '../' : '.',
                template: templateFile,
                filename: `./${(point ? `${point}/` : point) || ''}index.html`,
                chunks: ['commons', point || 'index'],
                minify: {
                    collapseWhitespace: true,
                    keepClosingSlash: true,
                    removeComments: false,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true,
                },
                inject: 'body',
                templateParameters,
            })];
        }
    });

    return {
        entry,
        htmlWebpackPlugin,
    };
};

// eslint-disable-next-line
module.exports = setS_MPA;

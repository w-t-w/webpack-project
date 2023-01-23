const del = require('del');
const path = require('path');
const webpack = require('webpack');
const Mocha = require('mocha');

const webConfig = require('../../chore/env/webpack.web.config');

const HTML_TEST_DIR = path.resolve(process.cwd(), './test/smoke/singleton/html.test.js');
const CSS_JS_TEST_DIR = path.resolve(process.cwd(), './test/smoke/singleton/css-js.test.js');

const mocha = new Mocha();

const smoke = () => {
    del([
        'build/**/*',
        '!build/vendors',
        '!build/vendors/main.js',
        '!build/vendors/main.js.LICENSE.txt',
        '!build/vendors/manifest.json',
    ]).then(() => {
        webpack(webConfig({ env: 'production' }), (err, stats) => {
            if (err) {
                if (err instanceof Error) {
                    throw err;
                } else {
                    throw new Error(err);
                }
            }
            console.log(stats.toString({
                preset: 'minimal',
                children: true,
                colors: true,
            }));
            mocha.addFile(HTML_TEST_DIR);
            mocha.addFile(CSS_JS_TEST_DIR);
            mocha.run();
        });
    }).catch((err) => {
        console.error(err);
    });
};

module.exports = smoke;

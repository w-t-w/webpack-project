const del = require('del');
const { resolve } = require('path');
const Mocha = require('mocha');
const webpack = require('webpack');

del([
    './build/js',
    './build/css',
    './build/asset',
    './build/index.html',
]).then(() => {
    const prodConfig = require('../../chore/type/webpack.prod');
    const mocha = new Mocha();
    webpack(prodConfig({}), (err, stats) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            children: true,
            preset: 'minimal',
        }));

        mocha.addFile(resolve(__dirname, '../unit/html-test.js'));
        mocha.addFile(resolve(__dirname, '../unit/css-js-test.js'));
        mocha.run();
    });
});

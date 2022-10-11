const del = require('del');
const webpack = require('webpack');
const Mocha = require('mocha');
const path = require('path');

const dllConfig = require('../../chore/base/webpack_dll.config');
const prodConfig = require('../../chore/buildChore/webpack_prod.config');

const mocha = new Mocha();

del(['./dist', './build']).then(() => {
    // eslint-disable-next-line
    webpack(dllConfig, (err, stats) => {
        if (err) {
            // eslint-disable-next-line
            console.error(err);
            process.exit(2);
        }
        // eslint-disable-next-line
        console.log('dll:', stats.toString({
            colors: true,
            modules: false,
            children: false,
        }), '\n');
        mocha.addFile(path.resolve(__dirname, './dll/manifest-json-test.js'));
        // eslint-disable-next-line
        webpack(prodConfig({}), (err, stats) => {
            if (err) {
                // eslint-disable-next-line
                console.error(err);
                process.exit(2);
            }
            // eslint-disable-next-line
            console.log('prod:', stats.toString({
                colors: true,
                modules: false,
                children: false,
            }));
            mocha.addFile(path.resolve(__dirname, './prod/html-test.js'));
            mocha.addFile(path.resolve(__dirname, './prod/js-css-test.js'));
            mocha.run();
        });
    });
}).catch((err) => {
    // eslint-disable-next-line
    console.error(err);
});

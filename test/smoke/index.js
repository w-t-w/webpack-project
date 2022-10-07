const rimraf = require('rimraf');
const webpack = require('webpack');
const Mocha = require('mocha');

rimraf('./dist', () => {
    const prodConfig = require('../../chore/buildChore/webpack_prod.config');
    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }));
    });
});
const yargs = require('yargs');
const argv = process.argv;

const vwConfig = {
    vw: [
        'postcss-px-to-viewport',
        {
            unitToConvert: 'px',
            viewportWidth: 750,
            viewportUnit: 'vw',
            unitPrecision: 8
        }
    ]
};

let env = '';
yargs.parse(argv.slice(2), (err, args) => {
    env = args.env;
});

const postcssConfig = {
    plugins: [
        'postcss-preset-env'
    ].concat(vwConfig[env] ? [vwConfig[env]] : [])
};

module.exports = postcssConfig;
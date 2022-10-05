const babelConfig = {
    presets: [[
        '@babel/preset-env', {
            modules: false,
            loose: false,
            useBuiltIns: 'usage',
            corejs: {
                version: 3,
                proposal: true
            }
        }
    ], [
        '@babel/preset-react', {
            runtime: 'automatic'
        }
    ]],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        [
            '@babel/plugin-transform-decorators',
            {
                legacy: true
            }
        ]
    ]
};

module.exports = babelConfig;
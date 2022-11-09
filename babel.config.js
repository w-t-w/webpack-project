const babelConfig = {
    presets: [[
        '@babel/preset-env',
        {
            useBuiltIns: 'usage',
            loose: false,
            modules: false,
            corejs: {
                version: 3,
                proposal: true,
            },
        },
    ], [
        '@babel/preset-react',
        {
            runtime: 'automatic',
        },
    ]],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true,
            },
        ],
    ],
};

module.exports = babelConfig;

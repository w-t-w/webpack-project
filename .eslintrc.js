const eslintrcConfig = {
    parser: '@babel/eslint-parser',
    extends: ['airbnb'],
    env: {
        node: true,
        browser: true
    },
    rules: {
        indent: ['error', 4]
    }
};

module.exports = eslintrcConfig;
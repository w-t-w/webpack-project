const eslintrcConfig = {
    parser: '@babel/eslint-parser',
    extends: ['airbnb'],
    env: {
        browser: true,
        node: true,
    },
    rules: {
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': 'off',
        'max-len': 'off',
        'no-restricted-syntax': 'off',
        'consistent-return': 'off',
        'class-methods-use-this': 'off',
    },
};

module.exports = eslintrcConfig;

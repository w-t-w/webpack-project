const eslintrcConfig = {
    parser: '@babel/eslint-parser',
    extends: ['airbnb'],
    env: {
        node: true,
        browser: true,
    },
    rules: {
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['js', 'jsx'] }],
        'import/no-dynamic-require': 'off',
        'no-unused-expressions': 'off',
        'import/prefer-default-export': 'off',
        'default-param-last': 'off',
        'react/prop-types': 'off',
        'no-return-assign': 'off',
        'consistent-return': 'off',
    },
};

module.exports = eslintrcConfig;

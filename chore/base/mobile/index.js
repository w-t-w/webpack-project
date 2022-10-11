const mobileConfig = {
    rem: {
        rules: {
            loader: 'px2rem-loader',
            options: {
                remUnit: 75,
                remPrecision: 8,
            },
        },
        templateParameters: 'rem',
    },
    vw: {
        postcssOptions: {
            plugins: [
                [
                    'postcss-px-to-viewport',
                    {
                        unitToConvert: 'px',
                        viewportUnit: 'vw',
                        viewportWidth: 750,
                        unitPrecision: 8,
                    },
                ],
            ],
        },
    },
};

const setMobile = (mobile) => mobileConfig[mobile];

module.exports = setMobile;

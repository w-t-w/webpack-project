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
    },
};

const setMobile = (mobile) => mobileConfig[mobile];

module.exports = setMobile;

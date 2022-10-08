const mobileConfig = {
    rem: {
        rules: {
            loader: 'px2rem-loader',
            options: {
                remUnit: 75,
                remPrecision: 8,
            },
        },
        templateParameters: `raw-loader?esModule=false!babel-loader!../../../../node_modules/lib-flexible/flexible`
    },
    vh: {},
};

const setMobile = (mobile) => mobileConfig[mobile];

module.exports = setMobile;

// 合并配置
const combineConfig = (args) => {
    if (!Array.isArray(args)) {
        throw new TypeError('传递的合并的参数必须为数组!');
    }
    let result = {};
    for (const val of args) {
        if (val === null || typeof val !== 'object') {
            throw new TypeError('参数数组中的数组元素必须为对象!');
        }
        result = { ...result, ...val };
    }
    return result;
};

module.exports = combineConfig;

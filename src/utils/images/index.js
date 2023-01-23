import config from '../../configs';

/**
 * 是否是 base64 编码类型或者编码方式
 * @param str
 * @returns {any}
 */
const isBase64 = (str) => str.startsWith(config.images.base64);

export default {
    isBase64,
};

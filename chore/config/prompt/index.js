/**
 * inquirer 互动基础配置
 * @type {{filter(*): *}}
 */
const config = {
    name: 'prompt',
    type: 'list',
    filter(value) {
        return value.toLowerCase();
    }
};

module.exports = {
    config
};
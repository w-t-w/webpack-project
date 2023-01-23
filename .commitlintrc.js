/**
 * 强制校验 git 本地提交的 gitmoji commit message 规范化
 * @type {{extends: string[]}}
 */
const commitLintConfig = {
    extends: ['gitmoji']
};

module.exports = commitLintConfig;

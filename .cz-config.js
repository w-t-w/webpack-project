const czConfig = {
    types: [{
        name: '📦️build =>【初始化打包】',
        value: ':package: build'
    }, {
        name: '🍻 chore =>【构建/依赖/工具】',
        value: ':beers: chore'
    }, {
        name: '✨  feat =>【新功能】',
        value: ':sparkles: feat'
    }, {
        name: '🐛 fix =>【修复Bug】',
        value: ':bug: fix'
    }, {
        name: '💄 style =>【代码样式美化】',
        value: ':lipstick: style'
    }, {
        name: '📄 docs =>【文档变更】',
        value: ':page_facing_up: docs'
    }, {
        name: '🚀️perf =>【性能优化】',
        value: ':rocket: perf'
    }, {
        name: '✅  test =>【测试】',
        value: ':white_check_mark: test'
    }, {
        name: '💥 refactor =>【重构】',
        value: ':boom: refactor'
    }, {
        name: '👷 ci =>【CI related changes】',
        value: ':construction_worker: ci'
    }],
    scopes: [{name: 'components scopes     【组件】'}, {name: 'hooks scopes          【hooks】'}, {name: 'logic scopes          【业务逻辑】'}],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    allowBreakingChanges: [':sparkles: feat', ':bug: fix', ':boom: refactor'],
    customScopesName: 'custom scopes         【自定义】',
    emptyScopesName: 'empty scopes          【空值】',
    messages: {
        type: '请选择本次提交的类型:(必选)',
        scope: '请选择本次提交的修改范围:',
        subject: '请简要描述一下本次提交:(必填)',
        body: '请对本次提交作详细描述:',
        breaking: '请对本次 BREAKING CHANGES 作详细描述:(必须以 BREAKING CHANGES 为开头)',
        footer: '请对 commit 删除对应的 issue 作详细描述:',
        confirmCommit: '是否确认针对本次提交的选择?(y/n)'
    },
    subjectLimit: 144
};

module.exports = czConfig;
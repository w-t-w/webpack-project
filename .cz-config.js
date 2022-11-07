const czConfig = {
    types: [{
        name: '🎉 build(初始化打包)',
        value: ':tada: build'
    }, {
        name: '📦️chore(构建/依赖/工具)',
        value: ':package: chore'
    }, {
        name: '✨  feat(新功能)',
        value: ':sparkles: feat'
    }, {
        name: '🐛 fix(修复 Bug)',
        value: ':bug: fix'
    }, {
        name: '💄 style(代码样式美化)',
        value: ':lipstick: style'
    }, {
        name: '🚀 perf(性能优化)',
        value: ':rocket: perf'
    }, {
        name: '📝 docs(变更文档)',
        value: ':memo: docs'
    }, {
        name: '✅  test(测试)',
        value: ':white_check_mark: test'
    }, {
        name: '🔥 refactor(重构)',
        value: ':fire: refactor'
    }, {
        name: '👷 ci(CI Related Changes)',
        value: ':construction_worker: ci'
    }, {
        name: '⏪️ revert(回退)',
        value: ':rewind: revert'
    }, {
        name: '🏗️wip(建设进程中<不推荐使用>)',
        value: ':building_construction: wip'
    }],
    messages: {
        type: '请选择本次提交类型:(必选)',
        scope: '请输入本次提交的修改范围:',
        customScope: '请选择本次提交的修改范围:',
        subject: '请简要描述本次提交:(必填)',
        body: '请对本次提交作详细描述:',
        breaking: '请对 BREAKING CHANGES 作详细描述:',
        footer: '请输入本次提交删除相对应的 issue:',
        confirmCommit: '是否确认关于本次提交的以上选择?(yes/no)'
    },
    scopes: [{name: 'hooks            (hooks 部分)'}, {name: 'components       (组件部分)'}, {name: 'business         (业务逻辑部分)'}],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesName: 'custom           (自定义)',
    emptyScopesName: 'empty            (空值)',
    allowBreakingChanges: [':sparkles: feat', ':bug: fix'],
    subjectLimit: 140
};

module.exports = czConfig;
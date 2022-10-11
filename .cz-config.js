const czConfig = {
    types: [{
        name: '🍻 build: 初始化打包',
        value: ':beers: build'
    }, {
        name: '📦️chore: 构建/依赖/工具',
        value: ':package: chore'
    }, {
        name: '✨  feat: 新功能',
        value: ':sparkles: feat'
    }, {
        name: '🐛 fix: 修复bug',
        value: ':bug: fix'
    }, {
        name: '🎨 style: 代码样式优化',
        value: ':art: style'
    }, {
        name: '📄 docs: 变更文档',
        value: ':page_facing_up: docs'
    }, {
        name: '🚀 perf: 性能优化',
        value: ':rocket: perf'
    }, {
        name: '✅  test: 测试',
        value: ':white_check_mark: test'
    }, {
        name: '🔥 refactor: 重构',
        value: ':fire: refactor'
    }, {
        name: '👷 ci: CI related changes',
        value: ':construction_worker: ci'
    }],
    messages: {
        type: '请输入您本次提交类型(必填):',
        scope: '请输入您本次提交修改范围:',
        customScope: '请选择您本次提交修改范围:',
        subject: '请简要描述本次提交(必填):',
        body: '请对本次提交作详细描述:',
        breaking: '请对本次提交与当前 API 产生比较大的不兼容作详细描述:',
        footer: '请对本次提交删除的所对应的 issue 作详细描述:',
        confirmCommit: '是否确认提交以上选择输入?'
    },
    scopes: [{name: 'components       [组件部分]'}, {name: 'hooks            [hooks部分]'}, {name: 'logics           [代码逻辑部分]'}],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesName: 'custom           [自定义]',
    emptyScopesName: 'empty            [不指定]',
    allowBreakingChanges: [':sparkles: feat', ':bug: fix'],
    subjectLimit: 80
};

module.exports = czConfig;
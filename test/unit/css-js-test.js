const glob = require('glob-all');

describe('用于校验构建打包是否产生 css/js 文件', () => {
    it('开始校验构建打包是否产生 css/js 文件', (done) => {
        const files = glob.sync([
            './build/**/*.css',
            './build/**/*.js',
        ]);
        if (files.length > 0) {
            done();
            console.log('      css/js 文件已生成~');
        } else {
            done(new Error('错误!并未发现构建打包产生的 css/js 文件!'));
        }
    });
});

const glob = require('glob-all');

describe('用于校验构建打包是否产生 html 访问文件', () => {
    it('开始校验构建打包是否产生 html 访问文件', (done) => {
        const files = glob.sync([
            './build/**/index.html',
        ]);
        if (files.length > 0) {
            done();
            console.log('      html 访问文件已生成~');
        } else {
            done(new Error('错误!并未发现构建打包产生的 html 访问文件!'));
        }
    });
});

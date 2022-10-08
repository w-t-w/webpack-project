const glob = require('glob-all');

// eslint-disable-next-line
describe('检查是否存在 DllPlugin 生产的 manifest.json 预编译文件:', () => {
    // eslint-disable-next-line
    it('通过运行 webpack_dll.config.js 施行检查:', (done) => {
        const files = glob.sync([
            './build/vendors/*.json',
        ]);
        if (files.length > 0) {
            done();
            // eslint-disable-next-line
            console.log('  发现被生产的 manifest.json 文件!');
        } else {
            throw new Error('错误!没有发现被生产的 manifest.json 文件!');
        }
    });
});

const glob = require('glob-all');

// eslint-disable-next-line
describe('检查是否存在生产的 js/css 入口/样式文件:', () => {
    // eslint-disable-next-line
    it('通过运行 webpack_prod.config.js 施行检查:', (done) => {
        const files = glob.sync([
            './build/js/*.js',
            './build/css/*.css',
        ]);
        if (files.length > 0) {
            done();
            // eslint-disable-next-line
            console.log('  发现被生产的 js/css 入口/样式文件!');
        } else {
            throw new Error('错误!没有发现被生产的 js/css 入口/样式文件!');
        }
    });
});

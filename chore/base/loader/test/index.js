const loaderRunner = require('loader-runner');
const path = require('path');
const fs = require('fs');

const STYLE_DIR = path.resolve(process.cwd(), './build/css/index.6701dcb3.css');
const LOADER_DIR = path.resolve(process.cwd(), './chore/base/loader/categories/cssTransformLoader.js');

/**
 * 测试自定义的 loader 而存在的
 */
loaderRunner.runLoaders({
    resource: STYLE_DIR,
    loaders: [{ loader: LOADER_DIR, options: { filename: 'spritesmith' } }],
    context: { minimize: true },
    readResource: fs.readFile.bind(fs),
}, (err, { result }) => {
    if (err) console.error(err);
    console.log('result', result[0]);
});
